import Container from "@/components/global/Container";
import { H1 } from "@/components/ui/typography";
import ConverterDropzone from "./ConverterDropzone";

const HeroSection = () => {
  return (
    <Container className="md:max-w-[90vw] space-y-6">
      <div className="flex items-center text-center flex-col gap-3">
        <H1>Cloud File Converter</H1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod ipsam,
          sit quaerat ab voluptate tempore illo nostrum repudiandae sint
          blanditiis deserunt? Vero tempore provident sequi rerum sapiente unde
          magnam facere!
        </p>
      </div>

      <ConverterDropzone />
    </Container>
  );
};

export default HeroSection;
