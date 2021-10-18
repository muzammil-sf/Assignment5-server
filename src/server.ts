import express, { Request, Response } from "express";
let cors = require("cors");
import dotenv from "dotenv";
const result = dotenv.config();
if (result.error) {
	throw result.error;
}
import { db } from "./models/assignment";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(cors());
enum Role {
	SuperAdmin = "Super Admin",
	Admin = "Admin",
	Subscriber = "Subscriber",
}

class User {
	constructor(
		public fname: string,
		public mname: string,
		public lname: string,
		public email: string,
		public pno: string,
		public role: Role,
		public address: string,
		public id?: number
	) {}
}

async function getAllUsers() {
	const response = await db.findAll();
	return response.map((x) => (<any>x).dataValues);
}

async function addUser(user: User) {
	const response = await db.create({
		fname: user.fname,
		mname: user.mname,
		lname: user.lname,
		email: user.email,
		pno: user.pno,
		role: user.role,
		address: user.address,
	});
	return response;
}

async function updateUserDetails(userId: number, newUserDetails: User) {
	const response = await db.update(
		{
			fname: newUserDetails.fname,
			mname: newUserDetails.mname,
			lname: newUserDetails.lname,
			email: newUserDetails.email,
			pno: newUserDetails.pno,
			role: newUserDetails.role,
			address: newUserDetails.address,
		},
		{ where: { id: userId } }
	);
	return response;
}

app.get("/refreshData", async (req: Request, res: Response) => {
	const data: User[] = await getAllUsers();
	res.send(data);
});

app.delete("/deleteRow/:id", async (req: Request, res: Response) => {
	const id = req.params.id;
	if (id) {
		await db.destroy({ where: { id } });
		res.send({ message: "success" });
	} else {
		res.send({message: "failure"});
	}
});

app.post("/editRow", async (req: Request, res: Response) => {
	let givenData = req.body;
	await updateUserDetails(givenData.id, {
		fname: givenData.fname,
		mname: givenData.mname,
		lname: givenData.lname,
		email: givenData.email,
		pno: givenData.pno,
		role: givenData.role,
		address: givenData.address,
	});
	res.send({ message: "success" });
});

app.post("/addData", async (req: Request, res: Response) => {
	const response: any = await addUser({
		fname: req.body.fname,
		mname: req.body.mname,
		lname: req.body.lname,
		email: req.body.email,
		pno: req.body.pno,
		role: req.body.role,
		address: req.body.address,
	});
	res.send({ message: "success", data: response.dataValues });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
