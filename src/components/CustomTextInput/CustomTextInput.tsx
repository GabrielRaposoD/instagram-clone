import { Controller, FieldError, UseControllerProps } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps } from 'react-native';

const CustomTextInput = (
  props: TextInputProps &
    UseControllerProps<any> & { error: FieldError | undefined }
) => {
  const { control, style, name, rules, error } = props;
  return (
    <>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={style}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...props}
          />
        )}
        name={name}
      />
      {error !== undefined ? (
        <Text style={styles.errorMessage}>{error?.message}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    textAlign: 'left',
    width: '100%',
    marginTop: -8,
    marginBottom: 10,
    fontSize: 10,
    marginLeft: 8,
  },
});

export default CustomTextInput;
