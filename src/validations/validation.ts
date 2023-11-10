import * as yup from "yup";
import { Gender } from "../models/user";
import { VitalType } from "../models/vital";

export enum CommandType {
  CREATE_USER = "create_user",
  GET_USER = "get_user",
  INSERT_VITAL = "insert_vital",
  GET_VITALS = "get_vitals",
  DELETE_VITALS = "delete_vitals",
  EDIT_VITAL = "edit_vital",
  AGGREGATE = "aggregate",
  POPULATION_INSIGHT = "population_insight",
}

export const createUserSchema = yup.object().shape({
  command: yup
    .string()
    .required("Invalid Command Type")
    .oneOf([CommandType.CREATE_USER]),
  userName: yup.string().required(),
  age: yup.number().required(),
  medicalConditions: yup.array(),
  gender: yup.string().oneOf(Object.values(Gender)).required(),
});

export const getUserSchema = yup.object().shape({
  command: yup
    .string()
    .required("Invalid Command Type")
    .oneOf([CommandType.GET_USER]),
  userName: yup.string().required(),
});

export const insertVitalSchema = yup.object().shape({
  command: yup
    .string()
    .required("Invalid Command Type")
    .oneOf([CommandType.INSERT_VITAL]),
  userName: yup.string().required(),
  vitalID: yup
    .string()
    .oneOf(Object.values(VitalType))
    .required("Invalid Vital_ID"),
  value: yup.number().required(),
  timestamp: yup.string().required(),
});

export const getVitalsSchema = yup.object().shape({
  command: yup
    .string()
    .required("Invalid Command Type")
    .oneOf([CommandType.GET_VITALS]),
  userName: yup.string().required(),
  period: yup.array().required(),
});

export const editVitalSchema = yup.object().shape({
  command: yup
    .string()
    .required("Invalid Command Type")
    .oneOf([CommandType.EDIT_VITAL]),
  userName: yup.string().required(),
  vitalID: yup
    .string()
    .required("Invalid Vital_ID")
    .oneOf(Object.values(VitalType)),
  timestamp: yup.date().required(),
  newValue: yup.number().required(),
});

export const deleteVitalsSchema = yup.object().shape({
  command: yup
    .string()
    .required("Invalid Command Type")
    .oneOf([CommandType.DELETE_VITALS]),
  userName: yup.string().required(),
  vitalID: yup
    .string()
    .required("Invalid Vital_ID")
    .oneOf(Object.values(VitalType)),
  timestamp: yup.date().required(),
});

export const aggregateSchema = yup.object().shape({
  command: yup
    .string()
    .required("Invalid Command Type")
    .oneOf([CommandType.AGGREGATE]),
  username: yup.string().required(),
  vital_ids: yup
    .array()
    .of(
      yup.string().required("Invalid Vital_ID").oneOf(Object.values(VitalType))
    )
    .required(),
  start_timestamp: yup.date().required(),
  end_timestamp: yup.date().required(),
});

export const populationInsightSchema = yup.object().shape({
  command: yup
    .string()
    .required("Invalid Command Type")
    .oneOf([CommandType.POPULATION_INSIGHT]),
  username: yup.string().required(),
  vital_id: yup
    .string()
    .required("Invalid Vital_ID")
    .oneOf(Object.values(VitalType)),
  start_timestamp: yup.date().required(),
  end_timestamp: yup.date().required(),
});
