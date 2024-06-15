import { InputField } from '@/components';
import { SignupFormLayout, SignupTextarea } from '..';
import { optionalFormData } from '@/consts/signup';

const SignupOptionalForm = ({ register, errors }: SignupFormProps) => {
  return (
    <SignupFormLayout title="선택">
      {optionalFormData.map((form, index) => {
        if (form.type === 'input') {
          return (
            <InputField
              key={index}
              register={register(form.value, form.registerOptions)}
              label={form.label}
              value={form.value}
              error={errors[form.value]}
            />
          );
        } else {
          return (
            <SignupTextarea
              key={index}
              register={register(form.value)}
              value={form.value}
            />
          );
        }
      })}
    </SignupFormLayout>
  );
};

export default SignupOptionalForm;
