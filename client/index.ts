import { parse } from "https://deno.land/std/flags/mod.ts";

function main(args: string[]) {
  const {
    cmd, // pass command
    x, // execute now
    get,
    multi,
  } = parse(args);

  if (get) {
    console.log("getting");
    return;
  } 


}
main(Deno.args);
