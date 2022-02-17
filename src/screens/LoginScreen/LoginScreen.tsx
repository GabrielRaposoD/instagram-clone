import * as yup from 'yup';

import {
  Button,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomTextInput } from 'components';
import { ScreenProps } from 'typings/global';
import { userService } from 'services';
import { yupResolver } from '@hookform/resolvers/yup';

type LoginData = {
  email: string;
  password: string;
};

const loginSchema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
  })
  .required();

const LoginScreen = ({ navigation }: ScreenProps<'Login'>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginData> = (data) =>
    userService.login(data.email, data.password);

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
      <Button title='Log In' onPress={handleSubmit(onSubmit)} />

      <Text style={styles.text} onPress={() => navigation.navigate('Register')}>
        Sign Up
      </Text>
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
  text: {
    color: '#3776d4',
    fontWeight: '700',
    position: 'absolute',
    bottom: 0,
    padding: 5,
  },
});

export default LoginScreen;
