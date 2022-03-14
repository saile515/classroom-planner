import { useEffect, useState } from "react";

import ContextMenu from ".";

export default function ContextButton(props: { icon: string }) {
	const [active, setActive] = useState<boolean>(false);

	return (
		<>
			<button
				className={` text-white h-6 mx-1 w-6 rounded-md border-slate-200 border-2 box-content text-center bg-blue-700`}
				onClick={() => {
					setActive(!active);
				}}>
				<img src={props.icon} alt="" className=" w-[70%] h-[70%] m-auto invert-[100%]" />
			</button>
			{active ? <ContextMenu setActive={setActive} /> : ""}
		</>
	);
}
