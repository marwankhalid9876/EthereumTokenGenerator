import fetchStream from "fetch-readablestream";
import { useEffect, useState } from "react";

function NewlineText(props) {
  const text = props.text;
  return text.split("\n").map((str) => <p>{str}</p>);
}

export default function Displayer(props) {
  useEffect(() => {
    function readAllChunks(readableStream) {
      if (readableStream) {
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
            props.setterminalDisplay(
              (prevState) => prevState + "\n" + strValue
            );

            chunks.push(value);
            return pump();
          });
        }

        return pump();
      }
    }

    console.log("Getting the Data");
    readAllChunks(props.terminalStream);
  }, [props.terminalStream]);

  return (
    <>
      <h5>Terminal</h5>
      {/* <span>{props.terminalDisplay}</span> */}
      <NewlineText text={props.terminalDisplay} />
    </>
  );
}
