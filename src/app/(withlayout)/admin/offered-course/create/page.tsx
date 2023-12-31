"use client";

import ACDepartmentField from "@/components/forms/ACDepartmentField";
import Form from "@/components/forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/forms/FormSelectField";
import OfferedCoursesField from "@/components/forms/OfferedCoursesField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";
import { useAddOfferedCourseMutation } from "@/redux/api/offeredCourseApi";
import { useSemesterRegistrationsQuery } from "@/redux/api/semesterRegistrationApi";
import { Button, Col, Row, message } from "antd";

const CreateOfferedCoursePage = () => {
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const { data, isLoading } = useSemesterRegistrationsQuery({
    limit: 10,
    page: 1,
  });

  const semesterRegistrations = data?.semesterRegistrations;
  const semesterRegistrationsOptions = semesterRegistrations?.map(
    (semester) => {
      return {
        label: semester?.academicSemester?.title,
        value: semester?.id,
      };
    }
  );

  const { data: value } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });
  
  const academicDepartments = value?.academicDepartments;
  
  const acDepartmentOptions = academicDepartments?.map((acDepartment) => {
    return {
      label: acDepartment?.title,
      value: acDepartment?.id,
    };
  });


  const onSubmit = async (data: any) => {
    console.log(data);
    
    message.loading("Creating.....");
    try {
      const res = await addOfferedCourse(data).unwrap();
      if (res?.id) {
        message.success("Offered Course created successfully");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };
  const base = "admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "offered-course", link: `/${base}/offered-course` },
        ]}
      />
      <h1>Create Offered Course</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <div style={{ margin: "10px 0px" }}>
              <FormSelectField
                options={semesterRegistrationsOptions as SelectOptions[]}
                name="semesterRegistrationId"
                label="Semester registration"
              />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <OfferedCoursesField name="courseIds" label="Courses" />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <ACDepartmentField
                name="academicDepartmentId"
                label="Academic department"
                options={acDepartmentOptions as SelectOptions[]}
              />
            </div>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          add
        </Button>
      </Form>
    </div>
  );
};

export default CreateOfferedCoursePage;