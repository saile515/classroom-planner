import { Dispatch, SetStateAction } from "react";

export default function ContextMenu(props: { setActive: Dispatch<SetStateAction<boolean>> }) {
	return (
		<div className="w-40 h-72 fixed top-0 z-10" onMouseLeave={() => props.setActive(false)}>
			<div className=" bg-slate-200 w-40 h-60 relative top-8 box-content border-2 border-white"></div>
		</div>
	);
}
