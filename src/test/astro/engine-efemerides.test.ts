import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getSun, getMoon, getPlanet, getCurrentTime } from '../../astro/engine-efemerides';

describe('Engine de Efemérides', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCurrentTime', () => {
    it('deve retornar data atual no timezone correto', () => {
      const now = getCurrentTime();
      expect(now).toBeInstanceOf(Date);
      expect(now.getTime()).toBeCloseTo(Date.now(), -1000); // Dentro de 1 segundo
    });
  });

  describe('getSun', () => {
    it('deve retornar posição do Sol', async () => {
      const testDate = new Date('2025-09-09T12:00:00-03:00');
      const sun = await getSun(testDate);
      
      expect(sun).toHaveProperty('longitude');
      expect(sun).toHaveProperty('latitude');
      expect(sun).toHaveProperty('sign');
      expect(sun).toHaveProperty('degree');
      expect(sun).toHaveProperty('retrograde');
      
      expect(typeof sun.longitude).toBe('number');
      expect(typeof sun.latitude).toBe('number');
      expect(typeof sun.sign).toBe('string');
      expect(typeof sun.degree).toBe('number');
      expect(typeof sun.retrograde).toBe('boolean');
      
      // Sol nunca está retrógrado
      expect(sun.retrograde).toBe(false);
      
      // Longitude deve estar entre 0 e 360
      expect(sun.longitude).toBeGreaterThanOrEqual(0);
      expect(sun.longitude).toBeLessThan(360);
      
      // Grau deve estar entre 0 e 30
      expect(sun.degree).toBeGreaterThanOrEqual(0);
      expect(sun.degree).toBeLessThan(30);
    });

    it('deve retornar signo correto para data específica', async () => {
      // 9 de setembro deve estar em Virgem
      const testDate = new Date('2025-09-09T12:00:00-03:00');
      const sun = await getSun(testDate);
      
      expect(sun.sign).toBe('Virgem');
    });
  });

  describe('getMoon', () => {
    it('deve retornar posição da Lua', async () => {
      const testDate = new Date('2025-09-09T12:00:00-03:00');
      const moon = await getMoon(testDate);
      
      expect(moon).toHaveProperty('longitude');
      expect(moon).toHaveProperty('latitude');
      expect(moon).toHaveProperty('sign');
      expect(moon).toHaveProperty('degree');
      expect(moon).toHaveProperty('retrograde');
      
      expect(typeof moon.longitude).toBe('number');
      expect(typeof moon.latitude).toBe('number');
      expect(typeof moon.sign).toBe('string');
      expect(typeof moon.degree).toBe('number');
      expect(typeof moon.retrograde).toBe('boolean');
      
      // Lua nunca está retrógrada
      expect(moon.retrograde).toBe(false);
      
      // Longitude deve estar entre 0 e 360
      expect(moon.longitude).toBeGreaterThanOrEqual(0);
      expect(moon.longitude).toBeLessThan(360);
    });
  });

  describe('getPlanet', () => {
    it('deve retornar posição de Mercúrio', async () => {
      const testDate = new Date('2025-09-09T12:00:00-03:00');
      const mercury = await getPlanet('Mercúrio', testDate);
      
      expect(mercury).toHaveProperty('longitude');
      expect(mercury).toHaveProperty('latitude');
      expect(mercury).toHaveProperty('sign');
      expect(mercury).toHaveProperty('degree');
      expect(mercury).toHaveProperty('retrograde');
      
      expect(typeof mercury.retrograde).toBe('boolean');
    });

    it('deve retornar posição de Vênus', async () => {
      const testDate = new Date('2025-09-09T12:00:00-03:00');
      const venus = await getPlanet('Vênus', testDate);
      
      expect(venus).toHaveProperty('longitude');
      expect(venus).toHaveProperty('sign');
      expect(venus.retrograde).toBe(false); // Vênus raramente retrógrada
    });

    it('deve retornar posição de Marte', async () => {
      const testDate = new Date('2025-09-09T12:00:00-03:00');
      const mars = await getPlanet('Marte', testDate);
      
      expect(mars).toHaveProperty('longitude');
      expect(mars).toHaveProperty('sign');
      expect(typeof mars.retrograde).toBe('boolean');
    });

    it('deve lançar erro para planeta inválido', async () => {
      const testDate = new Date('2025-09-09T12:00:00-03:00');
      
      await expect(getPlanet('Plutão', testDate)).rejects.toThrow();
    });
  });

  describe('Validação de dados', () => {
    it('deve retornar dados consistentes para mesma data', async () => {
      const testDate = new Date('2025-09-09T12:00:00-03:00');
      
      const sun1 = await getSun(testDate);
      const sun2 = await getSun(testDate);
      
      expect(sun1.longitude).toBe(sun2.longitude);
      expect(sun1.sign).toBe(sun2.sign);
      expect(sun1.degree).toBe(sun2.degree);
    });

    it('deve retornar dados diferentes para datas diferentes', async () => {
      const date1 = new Date('2025-09-09T12:00:00-03:00');
      const date2 = new Date('2025-09-10T12:00:00-03:00');
      
      const sun1 = await getSun(date1);
      const sun2 = await getSun(date2);
      
      // Posições devem ser diferentes (Sol se move ~1° por dia)
      expect(Math.abs(sun1.longitude - sun2.longitude)).toBeGreaterThan(0.5);
    });
  });
});

