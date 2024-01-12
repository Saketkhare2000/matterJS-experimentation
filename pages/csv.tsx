import React, { useEffect } from "react";
import { db } from "../firebase";
import { useCSVReader } from "react-papaparse";
import { collection, doc, writeBatch } from "firebase/firestore";
import { v4 as uuid4 } from "uuid";
const CSV = () => {
    const { CSVReader } = useCSVReader();
    const [CSVData, setCSVData] = React.useState<any>([]);
    const [header, setHeader] = React.useState<any>([]);
    const [formattedData, setFormattedData] = React.useState<any>([]);

    const uploadData = (CSVData: any) => {
        const batchData = writeBatch(db);
        CSVData.data.slice(1).forEach((item: any) => {
            const employeeData = {
                firstName: item[0],
                lastName: item[1],
                employeeSkills: item[2].split(", "),
                residence: item[3],
            };
            const docRef = doc(db, "employees", employeeData.firstName);
            batchData.set(docRef, employeeData);
            console.log(employeeData);
        });
        batchData.commit().then(() => {
            alert("Data uploaded successfully");
        });
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
                onClick={() => uploadData(CSVData)}
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
