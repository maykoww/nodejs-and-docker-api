import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../entities/Appointment';

import ICreateAppointmentsDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  constructor(private ormRepository: Repository<Appointment> = getRepository(Appointment)) { }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
      },
    });

    return findAppointment;
  }

  public async create({ date, provider_id }: ICreateAppointmentsDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
