import { Dispatch, SetStateAction } from "react";

export default function ContextMenu(props: { setActive: Dispatch<SetStateAction<boolean>> }) {
	return (
		<div onMouseLeave={() => props.setActive(false)} className="h-[17rem] left-0 top-0 fixed">
			<div className="bg-slate-200 w-40 h-60 relative top-8 border-2 border-slate-300 shadow-md"></div>
		</div>
	);
}
