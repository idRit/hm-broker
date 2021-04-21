const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const csv = require("csvtojson");

const parseCsv = async () => {
    const csvFilePath = __dirname + "/box/set.csv";
    const jsonArray = await csv().fromFile(csvFilePath);

    let trainingData = [];
    let outputArray = [];

    for (let i = 0; i < jsonArray.length; i++) {
        trainingData.push([
            parseFloat(jsonArray[i].src),
            parseFloat(jsonArray[i].key)
        ]);
    }

    const lastRow = await getLastRow();
    const lastRowCopy = JSON.parse(JSON.stringify(lastRow));
    const heighest = lastRowCopy.sort().pop();
    
    outputArray = lastRow.map(el => {
        let arr = Array(heighest).fill(0);
        arr[el - 1] = 1;
        return arr 
    });

    return {
        trainingData,
        outputArray,
        lastRow, heighest
    };
}

const getLastRow = async () => {
    const csvFilePath = __dirname + "/box/set.csv";

    let array = await csv()
        .fromFile(csvFilePath);
    
    return array
        .map(el => parseInt(el.dst));
}

exports.dstArray = getLastRow;

exports.trainDataSet = async () => {
    let data = await parseCsv();
    
    const trainingData = tf.tensor2d(data.trainingData);
    const outputData = tf.tensor2d(data.outputArray);
    const testingData = tf.tensor2d([[3, 5555]]);

    const model = tf.sequential();

    model.add(tf.layers.dense({
        inputShape: 2,
        activation: "sigmoid",
        units: 2
    }));
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: data.heighest + 3
    }));
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: data.heighest
    }));

    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(0.06)
    });
    
    try {
        await model.fit(trainingData, outputData, { epochs: 500 });
        await model.save('file://' + __dirname + "/box/model");

        model.predict(testingData).print();
    } catch (error) {
        console.log(error);
    }
}

exports.route = async (datapoint) => {
    const model = await tf
        .loadLayersModel('file://' + 
                        __dirname + 
                         '/box/model/model.json'
    );
    
    try {
        const testingData = tf.tensor2d([[datapoint.src, datapoint.key]]);
        let el = model.predict(testingData);

        let x = Math.max.apply(
            Math, el.arraySync()[0]
                .map((el, i) => { return { el, i } })
                .map(i => i.i)
        );

        return x + 1;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// const run = async () => {
//     await this.route({
//         src: 3, 
//         key: 5555 
//     });
// }

// run();