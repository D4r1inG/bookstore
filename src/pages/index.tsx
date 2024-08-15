import { useUserInfo } from '@/components/auth/Author';
import { getBooks, getPaymentQR, orderBook } from '@/services/books.service';
import { Button, Form, Input, message, Modal } from '@/UI';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const cover =
  'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function Home() {
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState(null);
  const { userInfo } = useUserInfo();

  const { data } = useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    select: (res) => res?.data.map((book) => ({ ...book, cover })),
  });

  return (
    <div className="h-screen flex flex-col items-center justify-center w-2/3 mx-auto relative">
      {userInfo?.role === 'admin' && (
        <div className="flex justify-end absolute top-8 right-0">
          <button
            className="flex items-center gap-2 admin-btn transition-all p-2 -m-2"
            onClick={() => router.push('/admin')}
          >
            <div>Admin dashboard</div>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      <div className="flex justify-end absolute top-8 left-0">
        <button
          className="flex items-center gap-2 admin-btn transition-all p-2 -m-2"
          onClick={() => {
            localStorage.removeItem('token');
            router.reload();
          }}
        >
          <div>Log out</div>
        </button>
      </div>
      <div className="flex flex-col items-center mt-16">
        <h1 className="text-3xl font-bold mb-4">Book Store</h1>
        <p className="text-sm text-gray-500">Click on the book to view more details</p>
      </div>
      <div className="grid grid-cols-3 gap-6 overflow-auto my-8 px-2">
        {data?.map((book) => (
          <div
            key={book.id}
            className="flex flex-col items-center py-4 px-8 border border-solid border-gray-200 rounded-md hover:border-gray-400 cursor-pointer"
            onClick={() => setSelectedBook(book)}
          >
            <img src={book.cover} alt={book.title} className="w-full h-40 object-cover mb-2" />
            <h3 className="text-xl font-bold">{book.title}</h3>
            <p className="text-sm text-center text-gray-500">{book.description}</p>
            <p className="text-sm text-center">{book.publisher}</p>
          </div>
        ))}
      </div>

      <Modal
        destroyOnClose
        centered
        width={400}
        open={!!selectedBook}
        onCancel={() => setSelectedBook(null)}
        footer={null}
      >
        <ModalContent selectedBook={selectedBook} />
      </Modal>
    </div>
  );
}

const ModalContent = ({ selectedBook }) => {
  const [QRCode, setQRCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handlePurchase = async (values) => {
    setLoading(true);
    const res: any = await orderBook(values?.code);
    setLoading(false);

    if (!res?.data) return message.error(res?.error);
    message.success('Đặt hàng thành công');

    const qrRes: any = await getPaymentQR();
    setQRCode(qrRes?.data);
  };

  if (QRCode) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-700">
          Vui lòng quét mã QR bên dưới để thanh toán:
          <p className="text-3xl mb-2">{selectedBook?.price.toLocaleString()}đ</p>
        </div>
        <img src={QRCode} alt="QR Code" className="w-full h-full object-fill" />
      </div>
    );
  }

  return (
    <>
      <img src={selectedBook?.cover} alt={selectedBook?.title} className="w-full h-[200px] object-fill" />
      <div className="p-4">
        <div className="flex gap-2 items-center mb-4">
          <h3 className="text-xl font-bold m-0">{selectedBook?.title}</h3> -{' '}
          <p className="text-sm m-0">{selectedBook?.publisher}</p>
        </div>
        <p className="text-sm text-gray-500">{selectedBook?.description}</p>
        <p className="text-3xl">{selectedBook?.price.toLocaleString()}đ</p>
        <Form form={form} onFinish={handlePurchase}>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mã thanh toán',
              },
            ]}
          >
            <Input placeholder="Mã thanh toán" />
          </Form.Item>
          <Button className="w-full mt-6" type="primary" htmlType="submit" loading={loading}>
            Purchase
          </Button>
        </Form>
      </div>
    </>
  );
};
