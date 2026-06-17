"use client";

import { Chip, Table, Button } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";

export default function JobsTable({ jobs = [] }) {
  // Helper function to dynamically style the status chip
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "published":
        return "success";
      case "draft":
        return "warning";
      case "closed":
      case "inactive":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    /* 1. RESPONSIVE WRAPPER: 
      `w-full` ensures it takes up the available space.
      `overflow-x-auto` allows horizontal scrolling on small screens.
      `touch-pan-x` improves swipe behavior on mobile devices.
    */
    <div className="w-full overflow-x-auto touch-pan-x pb-4">
      <Table>
        <Table.ResizableContainer>
          {/* 2. MINIMUM WIDTH: 
            `min-w-[700px]` guarantees the columns have enough room to render properly. 
            On devices smaller than 700px, the wrapper above takes over and adds a scrollbar.
          */}
          <Table.Content aria-label="Company Jobs Table" className="min-w-[700px]">
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="2fr" id="title" minWidth={180}>
                Job Title
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="type" minWidth={130}>
                Type
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="location" minWidth={130}>
                Location
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                Status
                <Table.ColumnResizer />
              </Table.Column>
              {/* Actions column fixed width to prevent it from squishing buttons */}
              <Table.Column defaultWidth="120px" id="actions" minWidth={120}>
                Actions
              </Table.Column>
            </Table.Header>
            
            <Table.Body>
              {jobs.map((job) => (
                <Table.Row key={job._id || job.id}>
                  <Table.Cell className="font-medium whitespace-nowrap">{job.title}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">{job.type}</Table.Cell>
                  <Table.Cell className="whitespace-nowrap">{job.location}</Table.Cell>
                  <Table.Cell>
                    <Chip color={getStatusColor(job.status)} size="sm" variant="soft">
                      {job.status || "Unknown"}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    {/* flex-nowrap prevents buttons from stacking on tight screens */}
                    <div className="flex items-center gap-2 flex-nowrap">
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        aria-label="View Details"
                      >
                        <Eye width={18} height={18} className="text-default-500" />
                      </Button>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        aria-label="Edit Job"
                      >
                        <Pencil width={18} height={18} className="text-default-500" />
                      </Button>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        color="danger" 
                        aria-label="Delete Job"
                      >
                        <TrashBin width={18} height={18} />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
}