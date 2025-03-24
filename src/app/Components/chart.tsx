"use client";
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

interface ChartProps {
  courses: any[];
  students: any[];
}

export const Charts = ({ courses, students }: ChartProps) => {
  const courseData = courses.reduce((acc, course) => {
    const month = new Date(course.createdAt).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const monthlyCourses = Object.entries(courseData).map(([month, count]) => ({
    month,
    count,
  }));

  const studentData = students.reduce((acc, student) => {
    const month = new Date(student.enrolledAt).toLocaleString("default", {
      month: "short",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const monthlyStudents = Object.entries(studentData).map(([month, count]) => ({
    month,
    count,
  }));

  const totalStudents = students.length;
  const completedAssignments = students.filter((s) =>
    s.progress?.some((p: any) => p.completed)
  ).length;
  const assignmentData = [
    { name: "Completed", value: completedAssignments },
    { name: "Pending", value: totalStudents - completedAssignments },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Assignment Completion</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={
                assignmentData.some((d) => d.value > 0)
                  ? assignmentData
                  : [{ name: "No Data", value: 1 }]
              }
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {assignmentData.some((d) => d.value > 0) ? (
                assignmentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsl(${
                      (index * 360) / assignmentData.length
                    }, 70%, 50%)`}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))
              ) : (
                <Cell key="no-data" fill="#e5e7eb" />
              )}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              formatter={(value, name) => [`${value} assignments`, name]}
            />
            <Legend
              iconType="circle"
              formatter={(value) => (
                <span className="text-gray-600 text-sm">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
        {!assignmentData.some((d) => d.value > 0) && (
          <div className="text-center text-gray-500 mt-2">
            No assignment data available
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Courses Created</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyCourses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" name="Courses Created" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Student Enrollment</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyStudents}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={2}
              name="Students Enrolled"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
