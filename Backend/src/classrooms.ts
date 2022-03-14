import { Schema, model } from "mongoose";

export interface Classroom {
	name: string;
	id: string;
	data: string;
}

export const schema = new Schema<Classroom>({
	name: { type: String, required: true },
	id: { type: String, required: true },
	data: { type: String, required: true },
});

export const ClassroomModel = model<Classroom>("Classroom", schema);

export async function createClassroom(props: Classroom) {
	const classroom = new ClassroomModel({
		name: props.name,
		id: props.id,
		data: props.data,
	});

	classroom.save();
}
