import catchAsync from "../../utils/catchAsync";

const createProperty = catchAsync((req, res) => {
    const payload = req.body;

    
})

const updateProperty = catchAsync((req, res) => {

})

const deleteProperty = catchAsync((req, res) => {

})
const getAllRentalRequest = catchAsync((req, res) => {

})
const approveOrRejectRentalReq = catchAsync((req, res) => {

})


export const landlordController = {
    createProperty,
    updateProperty,
    deleteProperty,
    getAllRentalRequest,
    approveOrRejectRentalReq
}