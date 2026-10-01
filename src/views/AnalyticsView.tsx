import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const AnalyticsView: React.FC = () => {
  const { formatPrice } = useCart();
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d'>('7d');

  // Realistic operational metrics for Ntamba Processors
  const metrics = {
    totalRevenueUGX: 28450000,
    ordersCount: 142,
    conversionRate: 3.42,
    mobileTrafficPercent: 82.4,
    cartAbandonmentRate: 24.1,
    averageOrderValueUGX: 200350,
    b2bSampleRequests: 19,
    b2bCommercialContractsWon: 4
  };

  const topSellingSKUs = [
    { sku: 'NPL01', name: 'Ntamba Coffee Ground 1kg', category: 'Coffee', salesQty: 84, revenueUGX: 3360000 },
    { sku: 'NPL06', name: 'Ntamba Roasted Beans 1kg', category: 'Coffee', salesQty: 72, revenueUGX: 2880000 },
    { sku: 'NPL19', name: 'Ntamba Pure Honey 650g Glass Jar', category: 'Honey', salesQty: 96, revenueUGX: 1440000 },
    { sku: 'NPL03', name: 'Ntamba Coffee Ground 250g', category: 'Coffee', salesQty: 110, revenueUGX: 1650000 },
    { sku: 'NPL12', name: 'FruitTreat Dried Mango 60g', category: 'Dried Fruits', salesQty: 240, revenueUGX: 960000 },
    { sku: 'NPL11', name: 'FruitTreat Dried Pineapple 60g', category: 'Dried Fruits', salesQty: 185, revenueUGX: 888000 }
  ];

  const recentTransactions = [
    { id: 'NTB-94281', customer: 'David K. (Kampala)', channel: 'MTN MoMo', amountUGX: 120000, status: 'Fulfilled', items: '2x Honey 490g, 1x Coffee 500g' },
    { id: 'NTB-94280', customer: 'Cafe Barista UG (Entebbe)', channel: 'Visa Card', amountUGX: 480000, status: 'Fulfilled', items: '1x Carton Roasted Beans 1kg (12x)' },
    { id: 'NTB-94279', customer: 'Nordic Roasters (Denmark)', channel: 'SWIFT B2B', amountUGX: 12500000, status: 'Processing', items: 'Commercial Sample Lot (Screen 18)' },
    { id: 'NTB-94278', customer: 'Sarah M. (Jinja)', channel: 'Airtel Money', amountUGX: 45000, status: 'Fulfilled', items: '3x FruitTreat Mango 60g, 1x Honey 150g' },
    { id: 'NTB-94277', customer: 'Green Grocers (Ntinda)', channel: 'MTN MoMo', amountUGX: 240000, status: 'Fulfilled', items: '1x Carton Ground 500g (12x)' }
  ];

  const handleExportCSV = () => {
    const csvRows = [
      ['Transaction ID', 'Customer', 'Channel', 'Amount (UGX)', 'Status', 'Items'],
      ...recentTransactions.map((t) => [t.id, t.customer, t.channel, t.amountUGX, t.status, `"${t.items}"`])
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ntamba-sales-report-${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 space-y-10">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#2D5A27]">
            Business Intelligence & Conversion Cockpit
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#2A1E17] mt-1">
            Real-Time Storefront Analytics
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Monitoring retail mobile conversion, B2B wholesale inquiries, and East African payment velocities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time range switcher */}
          <div className="flex p-1 bg-stone-200/80 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setTimeRange('today')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeRange === 'today' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeRange === '7d' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeRange === '30d' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600'
              }`}
            >
              30 Days
            </button>
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#2A1E17] hover:bg-[#D4A017] hover:text-[#2A1E17] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>📥</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block mb-1">
            Total Revenue ({timeRange.toUpperCase()})
          </span>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-[#2A1E17] font-mono tabular-nums">
            {formatPrice(metrics.totalRevenueUGX)}
          </span>
          <div className="mt-2 flex items-center text-xs text-[#2D5A27] font-semibold gap-1">
            <span>↑ +18.4%</span>
            <span className="text-stone-400 font-normal">vs previous period</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block mb-1">
            E-Commerce Conversion Rate
          </span>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-[#D4A017] font-mono tabular-nums">
            {metrics.conversionRate}%
          </span>
          <div className="mt-2 flex items-center text-xs text-[#2D5A27] font-semibold gap-1">
            <span>↑ +0.8%</span>
            <span className="text-stone-400 font-normal">optimized checkout flow</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block mb-1">
            Mobile Traffic Share
          </span>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-[#2A1E17] font-mono tabular-nums">
            {metrics.mobileTrafficPercent}%
          </span>
          <div className="mt-2 text-xs text-stone-500">
            High-converting smartphone visitors
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm">
          <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider block mb-1">
            B2B Cupping Pipeline
          </span>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-[#2D5A27] font-mono tabular-nums">
            {metrics.b2bSampleRequests} Samples
          </span>
          <div className="mt-2 text-xs text-stone-500">
            {metrics.b2bCommercialContractsWon} commercial contracts closed
          </div>
        </div>

      </div>

      {/* Secondary Metrics & Chart Mock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Top Selling Products */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-stone-100 pb-3">
            <h3 className="font-heading text-lg font-bold text-[#2A1E17]">
              Top Revenue Generating SKUs
            </h3>
            <span className="text-xs text-stone-400 font-mono">17 Total SKUs Active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase text-[10px]">
                  <th className="pb-2 font-semibold">SKU / Product</th>
                  <th className="pb-2 font-semibold">Category</th>
                  <th className="pb-2 font-semibold text-right">Units Sold</th>
                  <th className="pb-2 font-semibold text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {topSellingSKUs.map((sku) => (
                  <tr key={sku.sku} className="hover:bg-stone-50">
                    <td className="py-2.5">
                      <span className="font-bold text-stone-900 block font-sans">{sku.name}</span>
                      <span className="text-[10px] text-stone-400">{sku.sku}</span>
                    </td>
                    <td className="py-2.5 text-stone-600 font-sans">{sku.category}</td>
                    <td className="py-2.5 text-right font-bold text-stone-900">{sku.salesQty}</td>
                    <td className="py-2.5 text-right text-[#D4A017] font-bold">
                      {formatPrice(sku.revenueUGX)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Channels & Payment Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#2A1E17] border-b border-stone-100 pb-3">
              Payment Settlement Channels
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-stone-700">MTN Mobile Money (*165#)</span>
                  <span className="font-mono text-[#2A1E17] font-bold">54% (UGX 15.3M)</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="w-[54%] h-full bg-[#D4A017]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-stone-700">Airtel Money (*185#)</span>
                  <span className="font-mono text-[#2A1E17] font-bold">26% (UGX 7.4M)</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="w-[26%] h-full bg-red-600" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-stone-700">Visa / Mastercard / Flutterwave</span>
                  <span className="font-mono text-[#2A1E17] font-bold">12% (UGX 3.4M)</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="w-[12%] h-full bg-blue-600" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-stone-700">B2B SWIFT Wire Transfers</span>
                  <span className="font-mono text-[#2A1E17] font-bold">8% (UGX 2.3M)</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="w-[8%] h-full bg-[#2D5A27]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#2A1E17] text-white p-6 rounded-2xl shadow-sm space-y-3">
            <h4 className="font-heading text-base font-bold text-[#D4A017]">
              Conversion Rate Optimization Note
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Mobile traffic makes up 82.4% of total visitors. Implementing the instant USSD Mobile Money checkout alongside WhatsApp direct order buttons increased weekly conversion by +28.5%.
            </p>
          </div>

        </div>

      </div>

      {/* Recent Orders Stream */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-stone-100 pb-3">
          <h3 className="font-heading text-lg font-bold text-[#2A1E17]">
            Recent Transaction Log
          </h3>
          <span className="text-xs text-[#2D5A27] font-semibold">● Live Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase text-[10px]">
                <th className="pb-2">Order Ref</th>
                <th className="pb-2">Customer / Entity</th>
                <th className="pb-2">Channel</th>
                <th className="pb-2">Items Purchased</th>
                <th className="pb-2 text-right">Settlement</th>
                <th className="pb-2 text-right">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-stone-50">
                  <td className="py-2.5 font-bold text-stone-900">{tx.id}</td>
                  <td className="py-2.5 font-sans text-stone-800">{tx.customer}</td>
                  <td className="py-2.5 text-stone-600">{tx.channel}</td>
                  <td className="py-2.5 font-sans text-stone-600">{tx.items}</td>
                  <td className="py-2.5 text-right font-bold text-[#2A1E17]">
                    {formatPrice(tx.amountUGX)}
                  </td>
                  <td className="py-2.5 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
