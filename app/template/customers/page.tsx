import dynamic from "next/dynamic"
import CreateCustomers from "@/app/components/create_customers"
import { getRecentCustomers } from "@/app/lib/getCustomer";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { UserPlus, Users } from "@phosphor-icons/react/dist/ssr";


const ListCustomers = dynamic(() => import('@/app/components/recent_customers_tables'), { ssr: false })
export default async function  CustomerPage() {
	const customers = await getRecentCustomers()


	return (
		<Box>
      <Flex direction="column" gap="8">
        <Box>
          <Flex align="center" gap="2" >
            <UserPlus size={32}  />
            <Heading size="6">Add Your Customers</Heading>
          </Flex>
          <Text size="2" color="gray">Add your customers here to see them on the list below</Text>
          <CreateCustomers />
        </Box>
        
        <Box>
          <Flex align="center" gap="2" >
            <Users size={32}  />
            <Heading size="6">Saved Customers</Heading>
          </Flex>
          <Text size="2" color="gray" >
            Saved customers can be set as recipients of invoices, receipts, notices, etc.
          </Text>
          <ListCustomers customers={customers}/>
        </Box>
      </Flex>
    </Box>
	)
}