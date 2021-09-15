import fetchStream from "fetch-readablestream";
import { useEffect, useState } from "react";

export default function Test() {
  const [terminalDisplay, setterminalDisplay] = useState("");
  function readAllChunks(readableStream) {
    const reader = readableStream.getReader();
    const chunks = [];

    function pump() {
      return reader.read().then(({ value, done }) => {
        if (done) {
          console.log("done chunks");
          return chunks;
        }
        const strValue = new TextDecoder().decode(value);
        console.log("reading more", strValue);
        setterminalDisplay((prevState) => prevState + "\n" + strValue);

        chunks.push(value);
        return pump();
      });
    }

    return pump();
  }
  useEffect(() => {
    console.log("Getting the Data");
    fetchStream("http://localhost:8080/str")
      .then((response) => readAllChunks(response.body))
      .then((chunks) => console.dir(chunks));

    // fetchStream("http://localhost:8080/str").then((response) => {
    //   const reader = response.body.getReader();
    //   console.log("reader", reader);
    //   reader.on("data", (data) => {
    //     console.log(data.toString());
    //   });

    // fetchStream("http://localhost:8080/str").then((response) => {
    //   function streamToString(stream) {
    //     const chunks = [];
    //     return new Promise((resolve, reject) => {
    //       stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    //       stream.on("error", (err) => reject(err));
    //       stream.on("end", () =>
    //         resolve(Buffer.concat(chunks).toString("utf8"))
    //       );
    //     });
    //   }

    //   const result = streamToString(response.body.getReader().read());
    //   result.then((any) => console.log(any));
    // });
  }, []);
  return (
    <>
      <h5>Terminal</h5>
      <h5>{terminalDisplay}</h5>
    </>
  );
}
