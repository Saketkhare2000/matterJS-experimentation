import React, { useEffect } from "react";

import { useCSVReader } from "react-papaparse";
const CSV = () => {
  const { CSVReader } = useCSVReader();
  const [CSVData, setCSVData] = React.useState<any>([]);
  const [header, setHeader] = React.useState<any>([]);
  const [formattedData, setFormattedData] = React.useState<any>([]);
  const formatData = (data: any) => {
    //data.data is an array the first element is the header
    //the rest are the data

    const header = data.data[0];
    const formattedData = data.data.slice(1).map((row: any) => {
      const obj: any = {};
      header?.forEach((key: any, i: any) => {
        // if i = 3, key = "Employee Skills", split key by space and push to array

        obj[key] = row[i];
      });
      return obj;
    });

    setHeader(header);
    setFormattedData(formattedData);

    // formattedData &&
    //   formattedData?.forEach((item: any) => {
    //     item.employeeSkills = item?.employeeSkills?.split(" ");
    //     //push to array
    //     const arr: any = [];
    //     item &&
    //       item?.employeeSkills.forEach((skill: any) => {
    //         arr.push({ skill });
    //       });
    //     console.log(arr);
    //   });
  };

  return (
    <div>
      <CSVReader
        onUploadAccepted={(results: any) => {
          setCSVData(results);
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
        }: any) => (
          <>
            <div
              className="
            flex items-center justify-center
            gap-8 mt-10
            "
            >
              <button
                className="
              bg-blue-500 px-4 py-2 text-white rounded-md
              "
                type="button"
                {...getRootProps()}
              >
                Browse file
              </button>
              <div>{acceptedFile && acceptedFile.name}</div>
              <button
                className="
              bg-red-500 px-4 py-2 text-white rounded-md
              "
                {...getRemoveFileProps()}
              >
                Remove
              </button>
            </div>
            <ProgressBar />
          </>
        )}
      </CSVReader>

      <button
        className="
              bg-lime-900 px-4 py-2 text-white rounded-md
              "
        onClick={() => formatData(CSVData)}
      >
        Format Data
      </button>

      <table className="table-fixed w-full my-5 mx-2">
        <thead className="">
          <tr className="text-left border-b">
            {header?.map((item: any, index: number) => (
              <th key={index} className="py-3">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="p-3">
          {formattedData?.map((item: any, index: number) => (
            <tr key={index}>
              {header?.map((key: any, index: number) => (
                <td key={index} className="py-5">
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSV;
