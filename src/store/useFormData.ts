/*
 * @Author: 郭郭
 * @Date: 2025/12/19
 * @Description:
 */

import { create } from 'zustand';

export interface FormValues {
  /**
   * 表单数据
   */
  formValues: { [key: string]: any };

  /**
   * 设置表单数据
   * @param data
   */
  setFieldValues: (data: { [key: string]: any }) => void;

  /**
   * 设置表单单个数据
   * @param data
   */
  setFieldValue: (data: { [key: string]: any }) => void;
}

export const useFormData = create<FormValues>((set, get) => ({
  formValues: {},

  setFieldValues: (values: { [key: string]: any }) =>
    set(() => ({ formValues: values })),

  setFieldValue: (values: { [key: string]: any }) =>
    set((state) => ({ formValues: { ...state.formValues, ...values } })),
}));
