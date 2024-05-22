import React, { useContext, useEffect } from 'react';
import { Task as taskInterface } from '../../classes/service/service';
import ServiceSelect from '../ServiceSelect/ServiceSelect';
import Task from '../Task/Task';
import { Flex, Text, Button, Box } from '@radix-ui/themes';
import * as Collapsible from '@radix-ui/react-collapsible';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const CreatorTabDashboard = (props: { tasks: taskInterface[] }) => {
  const { loggedInUserID, isLoggedIn } = useContext(AuthContext);
  const { tasks } = props;

  const [services, setServices] = React.useState<string[]>([]);
  const [serviceView, setServiceView] = React.useState<string>('Show All');

  useEffect(() => {
    //TODO: Change this to get the services from the user context
    setServices([...new Set(tasks.map((task) => task.service))]);
  }, [tasks]);

  return (
    <Flex direction="column" gap="2">
      {/* //TODO: Change button to be icon, text needs to be dynamic, hide if there is nothing to show */}
      <Text size="5">Your reqests and task status'</Text>
      <Link to={`/${loggedInUserID}/services`}>
        <Button>View your services</Button>
      </Link>
      <Link to={`/${loggedInUserID}/services/create`}>
        <Button>Create new service</Button>
      </Link>
      <ServiceSelect services={services} setServiceView={setServiceView} />
      {tasks?.filter(
        (task) => task.status === 'pending' || task.status === 'rejected',
      ).length > 0 && (
        <Collapsible.Root>
          <Text> Pending Tasks </Text>
          <Collapsible.Trigger asChild>
            <Button>See</Button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            {
              <Flex direction="column" gap="1">
                {
                  // pending and rejected tasks
                  tasks
                    .filter((task) =>
                      serviceView !== 'Show All'
                        ? task.service === serviceView
                        : task,
                    )
                    .filter(
                      (task) =>
                        task.status === 'pending' || task.status === 'rejected',
                    )
                    .map((task) => {
                      return <Task key={task.taskID} {...task} />;
                    })
                }
              </Flex>
            }
          </Collapsible.Content>
        </Collapsible.Root>
      )}
      {/* //TODO: Change button to be icon, text needs to be dynamic, hide if there is nothing to show */}
      {tasks.filter(
        (task) => task.status !== 'pending' && task.status !== 'rejected',
      ).length > 0 && (
        <Collapsible.Root>
          <Text> Accepted Tasks </Text>
          <Collapsible.Trigger asChild>
            <Button>See</Button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            {
              <Flex direction="column" gap="1">
                {
                  // other tasks
                  <Flex direction="column" gap="1">
                    {tasks
                      .filter((task) =>
                        serviceView !== 'Show All'
                          ? task.service === serviceView
                          : task,
                      )
                      .filter(
                        (task) =>
                          task.status !== 'pending' &&
                          task.status !== 'rejected',
                      )
                      .map((task) => {
                        return <Task key={task.taskID} {...task} />;
                      })}
                  </Flex>
                }
              </Flex>
            }
          </Collapsible.Content>
        </Collapsible.Root>
      )}
      <Box></Box>
    </Flex>
  );
};

export default CreatorTabDashboard;