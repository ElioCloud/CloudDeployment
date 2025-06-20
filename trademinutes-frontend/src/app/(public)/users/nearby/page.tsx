"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryTabsWithBreadcrumb from "@/components/CategoriesWithBreadcrumbs";
import CategoriesGrid from "@/components/CategoriesGrid";
import TradeMinutesActionSteps from "@/components/ActionSteps";
import UsersBanner from "@/components/UsersBanner";
import UserGrid from "@/components/UserGrid";
import dynamic from "next/dynamic";
import ServiceFilters from "@/components/ServiceFilters";
import UsersNearbyBanner from "@/components/UsersNearbyBanner";

// Dynamically import MapUsers to prevent SSR issues
const MapUsers = dynamic(() => import("@/components/UsersNearby"), {
  ssr: false,
  loading: () => <div className="w-full h-[70vh] rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center"><div className="text-center text-gray-600">Loading map...</div></div>
});

export default function UsersNearby() {
  return (
    <main className="bg-white min-h-screen text-black">
      <Navbar />
      <br />
      <CategoryTabsWithBreadcrumb />
      <UsersNearbyBanner />

      <div className="max-w-7xl mx-auto px-0 py-8">
        <br />
        <ServiceFilters />
        <br />
        <MapUsers />
      </div>
      <TradeMinutesActionSteps />
      <Footer />
    </main>
  );
}
