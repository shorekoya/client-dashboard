import { Request, Response } from 'express';
import Client from '../models/Client';

// @desc    Create new client
// @route   POST /api/clients
// @access  Private
export const createClient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const client = new Client({
      name,
      email,
      phone,
      company,
      createdBy: (req as any).user._id,
    });

    await client.save();
    res.status(201).json(client);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find({ createdBy: (req as any).user._id });
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single client
// @route   GET /api/clients/:id
// @access  Private
export const getClientById = async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private
export const updateClient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company } = req.body;

    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.name = name || client.name;
    client.email = email || client.email;
    client.phone = phone || client.phone;
    client.company = company || client.company;

    await client.save();
    res.json(client);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private
export const deleteClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.deleteOne();
    res.json({ message: 'Client removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
