import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import IpDetails from "@/components/IpDetails";
import IPLocation from "@/components/IPLocation";
import ProtectIP from "@/components/ProtectIP";

export default function Home() {
  return (
    <>
      <div className="pt-10">
        <Header />
        </div>
      <IpDetails />
      <ProtectIP />     
      <IPLocation  />
      <FAQ />
      <Footer />
      
    </>
  );
}