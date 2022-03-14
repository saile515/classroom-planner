import "dotenv/config";

import { Classroom, ClassroomModel, createClassroom } from "./classrooms";
import { connect, model } from "mongoose";

import express from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/classroom/:id", async (req, res) => {
	ClassroomModel.findOne({ id: req.params.id }, (err: Error, data: Classroom) => {
		if (err) {
			res.status(404);
			return;
		}
		res.send(data);
	});
});

app.post("/classroom", async (req, res) => {
	try {
		new ClassroomModel(req.body).save();
		res.status(201);
	} catch {
		res.status(415);
	}
});

app.put("/classroom/:id", async (req, res) => {
	ClassroomModel.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, (err: Error) => {
		if (err) {
			res.status(404);
			return;
		}
		res.status(200);
	});
});

app.listen(port, async () => {
	await connect(process.env.DATABASE_URL as string);
	console.log(`Classroom Planner REST API listening on port ${port}`);
});
