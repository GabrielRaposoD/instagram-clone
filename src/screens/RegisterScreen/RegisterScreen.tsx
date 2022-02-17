import * as yup from 'yup';

import {
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomTextInput } from 'components';
import { userService } from 'services';
import { yupResolver } from '@hookform/resolvers/yup';

type RegisterData = {
  email: string;
  password: string;
  name: string;
};

const registerSchema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    name: yup.string().required().min(3),
  })
  .required();

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterData> = (data) =>
    userService.register(data);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Image
        style={styles.logo}
        source={require('assets/images/logo-typed.png')}
      />
      <CustomTextInput
        control={control}
        rules={{
          required: true,
        }}
        error={errors.name}
        name='name'
        placeholder='Full name'
        placeholderTextColor='rgba(54,54,54,1)'
        keyboardType='default'
        textContentType='givenName'
        style={styles.input}
      />
      <CustomTextInput
        control={control}
        rules={{
          required: true,
        }}
        error={errors.email}
        name='email'
        placeholder='Email'
        placeholderTextColor='rgba(54,54,54,1)'
        keyboardType='email-address'
        textContentType='emailAddress'
        style={styles.input}
      />
      <CustomTextInput
        control={control}
        rules={{
          required: true,
        }}
        error={errors.password}
        name='password'
        placeholder='Password'
        placeholderTextColor='rgba(54,54,54,1)'
        keyboardType='default'
        secureTextEntry={true}
        textContentType='password'
        style={styles.input}
      />
      <Button title='Register' onPress={handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#0a0a0a',
    borderColor: '#363535',
    borderStyle: 'solid',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: '#fafafa',
    borderRadius: 2,
    marginBottom: 10,
  },
});

export default RegisterScreen;
