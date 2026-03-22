package com.api.htg.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.api.htg.DTO.LoginAdminResponseDTO;
import com.api.htg.Entity.AdminEntity;
import com.api.htg.Entity.ExamsEntity;
import com.api.htg.Entity.StudentEntity;
import com.api.htg.Repository.AdminJpa;
import com.api.htg.Repository.StudentJpa;

import jakarta.mail.internet.MimeMessage;

@Service
public class AdminService {

    @Autowired
    AdminJpa adminRepo;

    @Autowired
    StudentJpa studentRepo;

    @Autowired
    JavaMailSender mailSender;

    public void notifyAll(String message) {
        for (StudentEntity student : studentRepo.findAll()) {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(student.getEmail());
            mailMessage.setSubject("Notification From HTG");
            mailMessage.setText(message);
            mailSender.send(mailMessage);
        }
    }

    public LoginAdminResponseDTO updateGeneral(LoginAdminResponseDTO responseDTO) {
        AdminEntity entity = adminRepo.findById(responseDTO.getId()).get();
        entity.setBranch(responseDTO.getBranch());
        entity.setYear(responseDTO.getYear());
        entity.setSemester(responseDTO.getSemester());
        Integer students = studentRepo.findBySection(entity.getSection()).size();
        responseDTO.setStudents(students);
        Integer approvedHallTickets = ((entity.getYear() - 1) * 2) + entity.getSemester() - 1;
        Integer upComingExams = 8 - approvedHallTickets;
        responseDTO.setUpComingExams(upComingExams);
        responseDTO.setApprovedHallTickets(approvedHallTickets);
        adminRepo.save(entity);
        return responseDTO;
    }

    private String buildTimeTableHTML(int year, int semester, List<ExamsEntity> exams, StudentEntity student) {

        StringBuilder sb = new StringBuilder();

        sb.append("<div style='font-family: Arial, sans-serif;'>");

        sb.append("<h2 style='color:#2E86C1;'>Exam Time Table</h2>");

        sb.append("<p>Dear <b>")
                .append(student.getName() != null ? student.getName() : "Student")
                .append("</b>,</p>");

        sb.append("<p>Here is your <b>")
                .append(year).append(" Year - Semester ").append(semester)
                .append("</b> exam schedule:</p>");

        sb.append("<table style='border-collapse: collapse; width: 100%; text-align: center;'>");

        sb.append("<tr style='background-color: #4CAF50; color: white;'>")
                .append("<th style='padding:8px; border:1px solid #ddd;'>Subject Code</th>")
                .append("<th style='padding:8px; border:1px solid #ddd;'>Subject</th>")
                .append("<th style='padding:8px; border:1px solid #ddd;'>Date</th>")
                .append("<th style='padding:8px; border:1px solid #ddd;'>Time</th>")
                .append("</tr>");

        for (ExamsEntity exam : exams) {
            sb.append("<tr>")
                    .append("<td style='padding:8px; border:1px solid #ddd;'>")
                    .append(exam.getSubCode() != null ? exam.getSubCode() : "-")
                    .append("</td>")

                    .append("<td style='padding:8px; border:1px solid #ddd;'>")
                    .append(exam.getSub() != null ? exam.getSub() : "-")
                    .append("</td>")

                    .append("<td style='padding:8px; border:1px solid #ddd;'>")
                    .append(exam.getDate() != null ? exam.getDate() : "-")
                    .append("</td>")

                    .append("<td style='padding:8px; border:1px solid #ddd;'>")
                    .append(exam.getTime() != null ? exam.getTime() : "-")
                    .append("</td>")
                    .append("</tr>");
        }

        sb.append("</table>");

        sb.append("<br><p style='color:#555;'>All the best for your exams! 👍</p>");
        sb.append("<p style='font-size:12px; color:gray;'>- HTG Team</p>");

        sb.append("</div>");

        return sb.toString();
    }

    @Async
    public void sendTimeTable(int year, int semester, List<ExamsEntity> timeTable) {

        List<StudentEntity> students = studentRepo.findAll();

        for (StudentEntity student : students) {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true);

                helper.setTo(student.getEmail());
                helper.setSubject("Exam Time Table - HTG");

                String htmlContent = buildTimeTableHTML(year, semester, timeTable, student);

                helper.setText(htmlContent, true);

                mailSender.send(message);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

}
