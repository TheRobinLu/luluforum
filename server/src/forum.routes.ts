import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const forumRouter = express.Router();
forumRouter.use(express.json());

forumRouter.get("/", async (_req, res) => {
	try {
		const forums = await collections.forums.find({}).toArray();
		res.status(200).send(forums);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

forumRouter.get("/:id", async (req, res) => {
	try {
		const id = req?.params?.id;
		const query = { _id: new mongodb.ObjectId(id) };
		const forum = await collections.forums.findOne(query);

		if (forum) {
			res.status(200).send(forum);
		} else {
			res.status(404).send(`Failed to find an forum: ID ${id}`);
		}
	} catch (error) {
		res.status(404).send(`Failed to find an forum: ID ${req?.params?.id}`);
	}
});

forumRouter.post("/", async (req, res) => {
	try {
		const forum = req.body;
		const result = await collections.forums.insertOne(forum);

		if (result.acknowledged) {
			res.status(201).send(`Created a new forum: ID ${result.insertedId}.`);
		} else {
			res.status(500).send("Failed to create a new forum.");
		}
	} catch (error) {
		console.error(error);
		res.status(400).send(error.message);
	}
});

forumRouter.put("/:id", async (req, res) => {
	try {
		const id = req?.params?.id;
		const forum = req.body;
		const query = { _id: new mongodb.ObjectId(id) };
		const result = await collections.forums.updateOne(query, { $set: forum });

		if (result && result.matchedCount) {
			res.status(200).send(`Updated an forum: ID ${id}.`);
		} else if (!result.matchedCount) {
			res.status(404).send(`Failed to find an forum: ID ${id}`);
		} else {
			res.status(500).send(`Failed to update an forum: ID ${id}`);
		}
	} catch (error) {
		console.error(error);
		res.status(400).send(error.message);
	}
});

forumRouter.delete("/:id", async (req, res) => {
	try {
		const id = req?.params?.id;
		const query = { _id: new mongodb.ObjectId(id) };
		const result = await collections.forums.deleteOne(query);

		if (result && result.deletedCount) {
			res.status(200).send(`Deleted an forum: ID ${id}.`);
		} else if (!result.deletedCount) {
			res.status(404).send(`Failed to find an forum: ID ${id}`);
		} else {
			res.status(500).send(`Failed to delete an forum: ID ${id}`);
		}
	} catch (error) {
		console.error(error);
		res.status(400).send(error.message);
	}
});
