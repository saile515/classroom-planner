import { CanvasState } from "./Canvas";
import ToolbarButton from "./ToolbarButton";
import Upload from "./Upload";

export default function Toolbar(props: { setCanvasState: (value: CanvasState) => void; canvasState: CanvasState }) {
	const ButtonProps = { setCanvasState: props.setCanvasState, canvasState: props.canvasState };
	return (
		<div className=" bg-slate-200 w-full h-12 flex flex-row items-center">
			<Upload />
			<ToolbarButton icon="line.png" state={CanvasState.DrawLine} {...ButtonProps} />
			<ToolbarButton icon="chair.png" state={CanvasState.PlaceSeat} {...ButtonProps} />
		</div>
	);
}
