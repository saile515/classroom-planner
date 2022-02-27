import Canvas, { CanvasState } from "../components/Canvas";

import Head from "next/head";
import type { NextPage } from "next";
import Toolbar from "../components/Toolbar";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
	const [canvasState, setCanvasState] = useState<CanvasState>(null);

	return (
		<div className={`${styles.container} grid grid-rows-[3rem_1fr] min-h-screen`}>
			<Head>
				<title>Classroom Planner</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Toolbar setCanvasState={setCanvasState} canvasState={canvasState} />
			<Canvas canvasState={canvasState} setCanvasState={setCanvasState} />
		</div>
	);
};

export default Home;
