import { ReactChild, ReactNode } from "react";

import { CanvasState } from "../Canvas";
import ContextButton from "./ContextMenu/ContextButton";
import ToolbarButton from "./ToolbarButton";

export function ToolbarSection(props: { children?: ReactNode }) {
	return <div className=" border-r-2 mr-2 border-slate-300">{props.children}</div>;
}

export default function Toolbar(props: { setCanvasState: (value: CanvasState) => void; canvasState: CanvasState }) {
	const ButtonProps = { setCanvasState: props.setCanvasState, canvasState: props.canvasState };
	return (
		<div className=" bg-slate-200 w-full h-8 flex flex-row items-center relative">
			<ToolbarSection>
				<ContextButton icon="file.png" />
			</ToolbarSection>
			<ToolbarSection>
				<ToolbarButton icon="line.png" state={CanvasState.DrawLine} {...ButtonProps} />
				<ToolbarButton icon="chair.png" state={CanvasState.PlaceSeat} {...ButtonProps} />
			</ToolbarSection>
		</div>
	);
}
