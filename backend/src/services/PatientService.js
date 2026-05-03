//class PatientService {
//  constructor({ userRepository, appointmentRepository }) {
//    this.userRepository = userRepository;
//    this.appointmentRepository = appointmentRepository;
//  }

//  /*async getDashboard(patientId, availableDoctorCount) {// added async here
//    const appointments = await this.appointmentRepository.findByPatientId(patientId);// await here

//    return {
//      availableDoctors: availableDoctorCount,
//      totalAppointments: appointments.length,
//      pendingReports: appointments.filter((item) => item.status !== "completed").length,
//    };
//  }*/
//    async getDashboard(patientId, availableDoctorCount) {
//        const appointments =
//            (await this.appointmentRepository.findByPatientId(patientId)) || [];

//        return {
//            availableDoctors: availableDoctorCount,
//            totalAppointments: appointments.length,
//            pendingReports: appointments.filter(
//                (item) => item.status !== "completed"
//            ).length,
//        };
//    }

//    //async getAppointments(patientId) {// added async here 
//    //    const appointments = await this.appointmentRepository.findByPatientId(patientId);// Fetch the appointments from the DB
//    ///*return this.appointmentRepository.findByPatientId(patientId).map((appointment) => {
//    //  const doctor = await this.userRepository.findById(appointment.doctorId);*/
//    //    return Promise.all(appointments.map(async (appointment) => {// new return logic
//    //        const doctor = await this.userRepository.findById(appointment.doctorId);

//    //        return {
//    //            id: appointment.id,
//    //            doctorId: appointment.doctorId,
//    //            doctorName: doctor ? doctor.name : "Unknown Doctor",
//    //            status: appointment.status,
//    //            rated: appointment.rated,
//    //            date: appointment.date,
//    //            reason: appointment.reason,
//    //        };
//    //    })
//    //);
//    //}
//    async getAppointments(patientId) {
//        const appointments =
//            (await this.appointmentRepository.findByPatientId(patientId)) || [];

//        return Promise.all(
//            appointments.map(async (appointment) => {
//                const doctor = await this.userRepository.findById(appointment.doctorId);

//                return {
//                    id: appointment.id,
//                    doctorId: appointment.doctorId,
//                    doctorName: doctor ? doctor.name : "Unknown Doctor",
//                    status: appointment.status,
//                    rated: appointment.rated,
//                    date: appointment.appointment_date, // FIXED
//                    reason: appointment.reason,
//                };
//            })
//        );
//    }

//}

//module.exports = { PatientService };

class PatientService {
    constructor({ userRepository, appointmentRepository }) {
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
    }

    //async getDashboard(patientId, availableDoctorCount) {
    //    const appointments =
    //        (await this.appointmentRepository.findByPatientId(patientId)) || [];

    //    return {
    //        availableDoctors: availableDoctorCount,
    //        totalAppointments: appointments.length,
    //        pendingReports: appointments.filter(
    //            (item) => item.status !== "completed"
    //        ).length,
    //    };
    //}
    async getDashboard(patientId, availableDoctorCount) {// new added
        const appointments = await this.appointmentRepository.findByPatientId(patientId);
        const safeAppointments = Array.isArray(appointments) ? appointments : [];

        return {
            availableDoctors: availableDoctorCount,
            totalAppointments: safeAppointments.length,
            pendingReports: safeAppointments.filter(
                (item) => item.status !== "completed"
            ).length,
        };
    }

    async getAppointments(patientId) {
        const appointments =
            (await this.appointmentRepository.findByPatientId(patientId)) || [];

        return Promise.all(
            appointments.map(async (appointment) => {
                const doctor = await this.userRepository.findById(appointment.doctorId);

                return {
                    id: appointment.id,
                    doctorId: appointment.doctorId,
                    doctorName: doctor ? doctor.name : "Unknown Doctor",
                    status: appointment.status,
                    rated: appointment.rated,
                    date: appointment.appointment_date,
                    reason: appointment.reason,
                };
            })
        );
    }
}

module.exports = { PatientService };
