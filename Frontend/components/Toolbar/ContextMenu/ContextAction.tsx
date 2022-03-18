import { ReactElement } from "react";

export default function ContextAction(props: { element: ReactElement; text: string }) {
	return (
		<>
			<button>{props.text}</button>
		</>
	);
}
