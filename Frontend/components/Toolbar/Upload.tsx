import { ChangeEvent } from "react";
import { useRouter } from "next/router";

export default function Upload() {
	const router = useRouter();

	async function fileUploaded(event: ChangeEvent<HTMLInputElement>) {
		const fileReader = new FileReader();
		fileReader.readAsText(event.target.files[0]);
		fileReader.onload = () => {
			let names: RegExpMatchArray | { first: string; last: string }[] = (fileReader.result as string).match(
				/^[0-9]{1,2}\,[A-Za-z\u00E5\u00E4\u00F6\u00C5\u00C4\u00c5\s]*\,[A-Za-z\u00E5\u00E4\u00F6\u00C5\u00C4\u00c5\s]*/gm
			);
			names = names.map((name) => {
				const arr = name.split(",");
				return { first: arr[2].split(" ")[1], last: arr[1] };
			});
			localStorage.setItem("nameList", JSON.stringify(names));
			router.reload();
		};
	}

	return (
		<>
			<label htmlFor="file" className=" block bg-blue-700 text-white h-6 mx-1 leading-6 text-xs px-2 rounded-md border-slate-200 border-2 box-content text-center">
				Upload File
			</label>
			<input accept=".txt" type="file" id="file" className=" hidden" onChange={fileUploaded} />
		</>
	);
}
