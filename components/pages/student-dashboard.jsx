"use client";
import React from "react";
import MainLayout from "../layout/main-layout";
import Sidebar from "../layout/sidebar";
import Navbar from "../layout/navbar";
import Card from "../global/card";

const StudentDashboardPage = () => (
  <MainLayout sidebar={<Sidebar role="student" />} navbar={<Navbar />}>
    <h1 className="text-3xl font-bold mb-6 text-black">Student Dashboard</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <h2 className="text-xl text-black font-semibold mb-2">Welcome!</h2>
        <p className="text-black">
          This is your student dashboard. Here you can access your enrolled
          courses, grades, and profile information.
        </p>
      </Card>

      <Card>
        <h2 className="text-xl text-black font-semibold mb-2">
          Quick Overview
        </h2>
        <ul className="list-disc list-inside text-black">
          <li>3 Courses in Progress</li>
          <li>1 Course Completed</li>
          <li>New Assignment Due Tomorrow</li>
        </ul>
      </Card>
    </div>
  </MainLayout>
);

export default StudentDashboardPage;
