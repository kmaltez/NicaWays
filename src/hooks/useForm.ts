import { produce, Draft } from "immer";
import { useEffect, useMemo, useState } from "react";
import type { FieldValidated, FormValidation, FormValues } from "./types";

export const useForm = (
  initialForm: FormValues,
  formValidations: FormValidation
) => {
  // Estado para manejar el estado del formulario
  const [formValues, setFormValues] = useState<FormValues>(initialForm);
  // Estado para manejar las validaciones ¡YA RESUELTAS!
  const [formValidation, setFormValidation] = useState<FieldValidated>({});
  useEffect(() => {
    createValidators();
  }, [formValues]);
  // *Este useMemo es para memorizar el valor de validación del formulario
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation as object)) {
      if (formValidation[formValue]) return false;
    }
    return true;
  }, [formValidation]);
  // Manejar cambio de formulario
  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormValues((prevValues) =>
      produce(prevValues, (draft: Draft<FormValues>) => {
        const keys = name.split("."); // Convierte "nombre.apellido" en ["nombre", "apellido"]
        let current: Draft<FormValues> = draft;

        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            // Última clave, asignar valor
            current[key] = value;
          } else {
            // Asegurar que current[key] es un objeto o array
            if (!(key in current) || typeof current[key] !== "object") {
              current[key] = {}; // Inicializa como objeto si no existe o no es objeto
            }
            current = current[key] as Draft<FormValues>; // Navega al siguiente nivel
          }
        });
      })
    );
  };
  //* Función para las validaciones
  const createValidators = () => {
    const formCheckedValues: FieldValidated = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "Error de validación"] =
        formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn(
        formValues[formField] as string
      )
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckedValues);
  };

  const onChangeMultiNested = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) =>
      produce(prevValues, (draft: Draft<FormValues>) => {
        const keys = name.split(".");
        let current: Draft<FormValues> = draft;
        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            current[key] = value;
          } else {
            if (!(key in current) || typeof current[key] !== "object") {
              current[key] = {};
            }
            current = current[key] as Draft<FormValues>;
          }
        });
      })
    );
  };
  // Función para manejar tarjetas de crédito
  //   const onChangeTarjetas = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     // Del target se desestructura el value y el name (Datos que usaré luego)
  //     const { name, value } = e.target;
  //     // Validación de espacios y formato de tarjeta
  //     let input = value.replace(/\D/g, "");
  //     if (input.length > 16) {
  //       input = input.substring(0, 16);
  //     }
  //     const newValue = input.match(/.{1,4}/g)?.join(" ") || "";
  //     // Se define nuevos valores al estado
  //     setFormValues({
  //       ...formValues,
  //       [name]: newValue,
  //     });
  //   };
  //   Actualizar toda la composición de un formulario
  const updateForm = (newForm: FormValues) => {
    setFormValues(newForm);
  };
  const resetForm = () => {
    setFormValues(initialForm);
  }
  return {
    formValues,
    isFormValid,
    formValidation,
    onChange,
    // onChangeTarjetas,
    onChangeMultiNested,
    updateForm,
    resetForm
  };
};
