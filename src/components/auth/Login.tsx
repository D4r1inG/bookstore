import { Button, Form, Input, message } from '@/UI';
import { APIResponse } from '@/interfaces';
import { login } from '@/services/books.service';
import { decodeToken } from '@/utils/functions';
import React from 'react';

export const Login = ({ setIsAllowed, setUserInfo }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const res: APIResponse = await login(values);

    if (!res?.data) return message.error(res?.error || 'Login failed');

    message.success('Login successfully');
    localStorage.setItem('token', res?.data.accessToken);

    const { rol } = decodeToken(res?.data.accessToken);

    setIsAllowed(true);
    setUserInfo({
      role: rol.includes('ADMIN') ? 'admin' : 'user',
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center w-1/4 mx-auto">
      <h2 className="font-bold mb-10 text-3xl">Login to book store</h2>

      <Form form={form} layout="vertical" className="w-full" onFinish={onFinish}>
        <Form.Item
          name="username"
          label="Username"
          required
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          required
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full mt-4">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
