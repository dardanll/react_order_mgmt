export default {
  sortBy: '',
  searchTerm: '',
  ordersList: [
    {
      id: 'ORD-0418-001',
      locked: false,
      date: '2018-04-11',
      price: 45,
      products: [
        {
          productId: 'Book',
          quantity: 2,
          price: 20
        },
        {
          productId: 'Pencil',
          quantity: 1,
          price: 5
        }
      ],
    },
    {
      id: 'ORD-0418-002',
      locked: true,
      date: '2018-04-08',
      price: 60,
      products: [
        {
          productId: 'Book',
          quantity: 2,
          price: 20
        },
        {
          productId: 'Ruler',
          quantity: 1,
          price: 20
        }
      ],
    },
    {
      id: 'ORD-0318-001',
      locked: true,
      date: '2018-03-05',
      price: 10,
      products: [
        {
          productId: 'Ruler',
          quantity: 2,
          price: 5
        }
      ],
    },
  ]
};