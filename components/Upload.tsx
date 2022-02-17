import { ChangeEvent } from "react";

export default function Upload() {
	async function fileUploaded(event: ChangeEvent<HTMLInputElement>) {
		const fileReader = new FileReader();
		fileReader.readAsText(event.target.files[0]);
		fileReader.onload = () => {
			let names = (fileReader.result as string).match(/^[0-9]{1,2}\,[A-Za-z\u00E5\u00E4\u00F6\u00C5\u00C4\u00c5\s]*\,[A-Za-z\u00E5\u00E4\u00F6\u00C5\u00C4\u00c5\s]*/gm);
			names = names.map((name) => {
				const arr = name.split(",");
				return `${arr[2]} ${arr[1]}`.trim();
			});
			localStorage.setItem("nameList", JSON.stringify(names));
		};
	}

	return (
		<>
			<label htmlFor="file" className=" block bg-blue-700 text-white h-8 m-2 w-24 leading-8 px-2 rounded-md border-slate-200 border-2 box-content text-center">
				Upload File
			</label>
			<input accept=".txt" type="file" id="file" className=" hidden" onChange={fileUploaded} />
		</>
	);
}
