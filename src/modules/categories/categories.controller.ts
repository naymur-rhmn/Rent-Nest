import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { categoriesService } from "./categories.service";
import  httpStatus  from "http-status";

const createCategories = catchAsync(async (req, res) => {
    const payload = req.body

    const newCategory = await categoriesService.createCategories(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Category created Successfull",
        data: {newCategory}
    })
}) 
const getAllCategories = catchAsync(async(req, res) => {
    const categories = await categoriesService.getAllCategories();

    sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Category retrived Successfull",
    data: {
        categories
    }
    })
}) 
const deleteCategories = catchAsync( async(req, res) => {
    const id = req.params?.id;
    console.log("Delete category id:", id);

    await categoriesService.deleteCategories(id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category deleted Successfull",
        data: []
    })
}) 

export const categoriesController = {
    createCategories,
    getAllCategories,
    deleteCategories
}