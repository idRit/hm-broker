import {
  Client,
  Event,
  Packet,
} from "https://deno.land/x/tcp_socket@0.0.1/mods.ts";

const client = new Client({ hostname: "127.0.0.1", port: 9898 });

// Connection open
client.on(Event.connect, async (client: Client) => {
  console.log("Connect", client.conn?.remoteAddr);
  await client.write("Hello World");
});

// Receive message
client.on(Event.receive, (client: Client, data: Packet) => {
  console.log("Connect", client.conn?.remoteAddr);
  console.log("Receive", data.toString());
});

// Connection close
client.on(Event.close, (client: Client) => {
  console.log("Connect", client.conn?.remoteAddr);
  console.log("Close");
});

// Handle error
client.on(Event.error, (e) => {
  console.error(e);
  client.close();
});

await client.connect();
