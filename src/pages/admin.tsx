import { Button, Table, message } from '@/UI';
import { confirmTransaction, getBookTransactions } from '@/services/books.service';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Admin() {
  const router = useRouter();

  const { data, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: getBookTransactions,
    select: (res) => res?.data,
  });

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'text',
      key: 'text',
    },
    {
      title: 'Payment Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (text, record) => (
        <Button
          onClick={async () => {
            const res = await confirmTransaction({
              transactionId: record?.id,
              status: 'SUCCESS',
            });

            if (res?.data) {
              message.success('Transaction confirmed');
              refetch();
            }
          }}
        >
          Confirm
        </Button>
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col justify-center items-center p-20 relative">
      <div className="flex justify-end absolute top-8 left-20">
        <button
          className="flex items-center gap-2 admin-btn transition-all p-2 -m-2"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          <div>Back</div>
        </button>
      </div>
      <h2 className="mb-16">All Transactions</h2>
      <div className="w-full">
        <Table columns={columns} dataSource={data} rowKey={'id'} />
      </div>
    </div>
  );
}
