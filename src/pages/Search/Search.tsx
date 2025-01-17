import { TextField, Flex, ScrollArea } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Service } from '../../classes/service/service';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { useState, useEffect } from 'react';
import { getAllServices } from '../../services/apiServices';

export default function Search() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  useEffect(() => {
    const runner = async () => {
      const services = await getAllServices()
      setServices(services);
    }
    runner()
  }, []);

  const handelSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchQuery((e.target as HTMLInputElement).value);
  };

  return (
    <Flex justify="center" align="center" direction="column" gap="5">
      <TextField.Root
        placeholder="Search the docs…"
        onInput={(e) => handelSearchChange(e)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <ScrollArea style={{ width: '100%', height: '100%' }}>
        <Flex direction="column" gap="6" justify="center">
          {services
            .filter((service) =>
              service.name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((service, index) => (
              //TODO: change key when services are better typed
              <ServiceCard key={index} service={service} />
            ))}
        </Flex>
      </ScrollArea>
    </Flex>
  );
}
