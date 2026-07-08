import status from "http-status";
import AppError from "../../errors/app-error.js";

const addNewBrand = async () => {
  try {
  } catch (error) {
    throw new AppError("Failed to add new brand", status.INTERNAL_SERVER_ERROR);
  }
};

const getBrands = async () => {
  try {
  } catch (error) {
    throw new AppError("Failed to get brands", status.INTERNAL_SERVER_ERROR);
  }
};

const getBrandById = async () => {
  try {
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError("Failed to get brand", status.INTERNAL_SERVER_ERROR);
  }
};

const updateBrandById = async () => {
  try {
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError("Failed to update brand", status.INTERNAL_SERVER_ERROR);
  }
};

const deleteBrandById = async () => {
  try {
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError("Failed to delete brand", status.INTERNAL_SERVER_ERROR);
  }
};

export const brandService = {
  addNewBrand,
  getBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
};
