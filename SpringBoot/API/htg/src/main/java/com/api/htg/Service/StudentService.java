package com.api.htg.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.api.htg.Entity.StudentEntity;
import com.api.htg.Repository.StudentJpa;

@Service
public class StudentService {

    @Autowired
    private StudentJpa studentRepo;

    public List<StudentEntity> getStudents(Character section) {
        return studentRepo.findBySection(section);
    }

    public List<StudentEntity> addStudent(MultipartFile img, StudentEntity entity) throws Exception {
        if (studentRepo.existsById(entity.getId()))
            throw new IllegalStateException("Student already exists!");
        entity.setImgData(img.getBytes());
        entity.setImgType(img.getContentType());
        entity.setImgName(entity.getId());
        studentRepo.save(entity);
        return getStudents(entity.getSection());
    }

    public List<StudentEntity> updateStudent(MultipartFile img, StudentEntity entity) throws Exception {
        Optional<StudentEntity> optional = studentRepo.findById(entity.getId());
        if (!optional.isPresent())
            throw new IllegalStateException();
        StudentEntity existingEntity = optional.get();
        existingEntity.setName(entity.getName());
        existingEntity.setEmail(entity.getEmail());
        existingEntity.setImgData(img.getBytes());
        existingEntity.setImgType(img.getContentType());
        studentRepo.save(existingEntity);
        return getStudents(entity.getSection());
    }

    public List<StudentEntity> deleteStudent(String stuId) throws Exception {
        Optional<StudentEntity> optional = studentRepo.findById(stuId);
        if (!optional.isPresent())
            throw new IllegalStateException();
        studentRepo.deleteById(stuId);
        return getStudents(optional.get().getSection());
    }

}
