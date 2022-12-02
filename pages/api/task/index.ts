import { NextApiRequest, NextApiResponse } from "next";
import { Todo } from "../../../lib/interfaces";
// import Task from "../../../models/Task";
/// import Task from "../../../models/Task";

export type ServerDataTasks = {
  message: string;
  status: number;
  data?: Todo[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerDataTasks>
) {
  try {
    const { tasks } = data;
    if (typeof tasks !== undefined) {
      res.status(200).json({
        status: 200,
        message: "Tasks fetched successfully",
        data: data.tasks,
      });
    }
  } catch (error) {
    console.error(error);
  }
}

// // const { method } = req;
// // // Connect to database.
// // /// await dbConnect()
// // if (method === "POST") {
// //   try {
// //     res.status(201).json({
// //       data: data.tasks,
// //       message: "Task added successfully",
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: `Internal Server Error: ${error}.` });
// //   }
// // }
// // if (method === "GET") {
// //   try {
// //     res.status(200).json({
// //       data: data.tasks,
// //       message: "Task found successfully.",
// //     });
// //   } catch (error) {
// //     res.status(500).json({ message: `Internal Server Error: ${error}.` });
// //   }
// // }
// Create task.
// await resMongoDB(method, req, res);

//// async function resMongoDB(
////   method: string | undefined,
////   req: NextApiRequest,
////   res: NextApiResponse<any>
//// ) {
////   if (method === "POST") {
////     try {
////       const newTask = await new Task(req.body).save();
////       res
////         .status(201)
////         .json({ data: newTask, message: "Task added successfully" });
////     } catch (err) {
////       res.status(500).json({ message: `${err}: Internal Server Error` });
////     }
////   }
///
////   // Find tasks.
////   if (method === "GET") {
////     try {
////       const tasks = await Task.find();
////       res.status(200).json({ data: tasks });
////     } catch (err) {
////       res.status(500).json({ message: `${err}: Internal Server Error` });
////       console.log(err);
////     }
////   }
//// }
