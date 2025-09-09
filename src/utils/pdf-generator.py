#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AURORA SAGRADA - GERADOR DE RELATÓRIOS ASTROLÓGICOS EM PDF
Sistema automático de geração de relatórios personalizados por data
Conecta-se às bases de dados JavaScript para extrair conteúdo
"""

import os
import sys
import json
import re
import datetime
from pathlib import Path
from typing import Dict, List, Any, Optional

# ReportLab imports
from reportlab.lib.pagesizes import A4, letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.units import inch, cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    Image, KeepTogether, Frame, PageTemplate
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

class AuroraReportGenerator:
    """Gerador de relatórios astrológicos Aurora Sagrada"""
    
    # Paleta de cores Aurora Sagrada
    COLORS = {
        'vinho': HexColor('#661D48'),
        'azul_noite': HexColor('#0B1836'),
        'dourado': HexColor('#DAA520'),
        'pergaminho': HexColor('#F2EAFF'),
        'salvia': HexColor('#B2D1B1'),
        'preto': HexColor('#000000'),
        'branco': HexColor('#FFFFFF')
    }
    
    def __init__(self, data_dir: str = None):
        """
        Inicializa o gerador de relatórios
        
        Args:
            data_dir: Diretório contendo as bases de dados JavaScript
        """
        self.data_dir = Path(data_dir) if data_dir else Path(__file__).parent.parent.parent / 'data'
        self.bases_data = {}
        self.styles = self._create_styles()
        
        # Carregar bases de dados
        self._load_bases()
    
    def _create_styles(self) -> Dict[str, ParagraphStyle]:
        """Cria estilos personalizados Aurora Sagrada"""
        styles = getSampleStyleSheet()
        
        custom_styles = {
            'AuroraTitle': ParagraphStyle(
                'AuroraTitle',
                parent=styles['Title'],
                fontName='Helvetica-Bold',
                fontSize=24,
                textColor=self.COLORS['dourado'],
                alignment=TA_CENTER,
                spaceAfter=20
            ),
            'AuroraHeading1': ParagraphStyle(
                'AuroraHeading1',
                parent=styles['Heading1'],
                fontName='Helvetica-Bold',
                fontSize=18,
                textColor=self.COLORS['vinho'],
                spaceBefore=20,
                spaceAfter=12
            ),
            'AuroraHeading2': ParagraphStyle(
                'AuroraHeading2',
                parent=styles['Heading2'],
                fontName='Helvetica-Bold',
                fontSize=14,
                textColor=self.COLORS['azul_noite'],
                spaceBefore=15,
                spaceAfter=8
            ),
            'AuroraBody': ParagraphStyle(
                'AuroraBody',
                parent=styles['Normal'],
                fontName='Helvetica',
                fontSize=11,
                textColor=self.COLORS['azul_noite'],
                alignment=TA_JUSTIFY,
                spaceAfter=8,
                leading=14
            ),
            'AuroraQuote': ParagraphStyle(
                'AuroraQuote',
                parent=styles['Normal'],
                fontName='Helvetica-Oblique',
                fontSize=10,
                textColor=self.COLORS['vinho'],
                alignment=TA_CENTER,
                leftIndent=20,
                rightIndent=20,
                spaceAfter=12,
                leading=13
            ),
            'AuroraCaption': ParagraphStyle(
                'AuroraCaption',
                parent=styles['Normal'],
                fontName='Helvetica',
                fontSize=9,
                textColor=self.COLORS['salvia'],
                alignment=TA_CENTER,
                spaceAfter=6
            )
        }
        
        return custom_styles
    
    def _load_bases(self):
        """Carrega as bases de dados JavaScript"""
        base_files = [
            'efemerides-completas-integrais.js',
            'BasedeDadosdoguiaLunar.js',
            'mansoes-lunares-expandido.json',
            'hinos-orficos.json',
            'esbats.json',
            'correspondencias-expandido.json'
        ]
        
        for filename in base_files:
            filepath = self.data_dir / filename
            if filepath.exists():
                try:
                    if filename.endswith('.js'):
                        self.bases_data[filename] = self._parse_js_file(filepath)
                    else:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            self.bases_data[filename] = json.load(f)
                except Exception as e:
                    print(f"Erro ao carregar {filename}: {e}")
    
    def _parse_js_file(self, filepath: Path) -> Dict[str, Any]:
        """Parse básico de arquivos JavaScript para extrair dados"""
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extrair objetos JavaScript usando regex simples
        data = {}
        
        # Padrão para objetos const
        const_pattern = r'const\s+(\w+)\s*=\s*\{(.*?)\};'
        matches = re.findall(const_pattern, content, re.DOTALL)
        
        for name, obj_content in matches:
            # Simplificação: apenas armazenar o conteúdo bruto
            data[name] = obj_content.strip()
        
        return data
    
    def calculate_lunar_mansion(self, date: datetime.date) -> int:
        """Calcula a mansão lunar para uma data específica"""
        # Cálculo simplificado baseado no dia do ano
        day_of_year = date.timetuple().tm_yday
        mansion = ((day_of_year - 1) % 28) + 1
        return mansion
    
    def calculate_lunar_phase(self, date: datetime.date) -> str:
        """Calcula a fase lunar para uma data específica"""
        # Cálculo simplificado baseado no dia do mês
        day = date.day
        if day <= 7:
            return "Nova"
        elif day <= 14:
            return "Crescente"
        elif day <= 21:
            return "Cheia"
        else:
            return "Minguante"
    
    def get_goddess_of_day(self, date: datetime.date) -> Dict[str, Any]:
        """Obtém a deusa do dia"""
        day_of_year = date.timetuple().tm_yday
        
        # Dados simulados baseados nas bases
        goddesses = {
            1: {"nome": "Brigid", "elemento": "Fogo", "dominio": "Forja, Poesia, Cura"},
            2: {"nome": "Ísis", "elemento": "Água", "dominio": "Magia, Mistérios, Proteção"},
            # Adicionar mais conforme necessário
        }
        
        return goddesses.get(day_of_year, {
            "nome": "Deusa Universal",
            "elemento": "Todos",
            "dominio": "Harmonia e Equilíbrio"
        })
    
    def get_lunar_mansion_data(self, mansion_number: int) -> Dict[str, Any]:
        """Obtém dados da mansão lunar"""
        # Dados das mansões lunares expandidas
        if 'mansoes-lunares-expandido.json' in self.bases_data:
            mansions = self.bases_data['mansoes-lunares-expandido.json']
            if 'mansoes' in mansions and str(mansion_number) in mansions['mansoes']:
                return mansions['mansoes'][str(mansion_number)]
        
        # Dados padrão se não encontrar
        return {
            "nome": f"Mansão {mansion_number}",
            "espiritoToscano": "Espírito Lunar",
            "natureza": "Neutra",
            "significado": "Influência lunar geral",
            "usosMagicos": ["Rituais lunares", "Meditação", "Intuição"],
            "correspondencias": {
                "ervas": ["Artemísia", "Sálvia"],
                "pedras": ["Pedra da Lua", "Quartzo"],
                "cores": ["Prateado", "Branco"]
            }
        }
    
    def generate_daily_report(self, date: datetime.date, output_path: str = None) -> str:
        """
        Gera relatório astrológico diário
        
        Args:
            date: Data para o relatório
            output_path: Caminho de saída do PDF
            
        Returns:
            Caminho do arquivo PDF gerado
        """
        if not output_path:
            output_path = f"aurora_sagrada_{date.strftime('%Y%m%d')}.pdf"
        
        # Criar documento PDF
        doc = SimpleDocTemplate(
            output_path,
            pagesize=A4,
            rightMargin=2*cm,
            leftMargin=2*cm,
            topMargin=2*cm,
            bottomMargin=2*cm
        )
        
        # Construir conteúdo
        story = []
        
        # Cabeçalho
        story.extend(self._build_header(date))
        
        # Seção: Informações Gerais
        story.extend(self._build_general_info(date))
        
        # Seção: Mansão Lunar
        story.extend(self._build_lunar_mansion_section(date))
        
        # Seção: Deusa do Dia
        story.extend(self._build_goddess_section(date))
        
        # Seção: Fase Lunar
        story.extend(self._build_lunar_phase_section(date))
        
        # Seção: Eleições Mágicas
        story.extend(self._build_magical_elections_section(date))
        
        # Seção: Correspondências
        story.extend(self._build_correspondences_section(date))
        
        # Rodapé
        story.extend(self._build_footer())
        
        # Gerar PDF
        doc.build(story)
        
        return output_path
    
    def _build_header(self, date: datetime.date) -> List[Any]:
        """Constrói o cabeçalho do relatório"""
        elements = []
        
        # Título principal
        title = f"AURORA SAGRADA"
        elements.append(Paragraph(title, self.styles['AuroraTitle']))
        
        # Subtítulo com data
        subtitle = f"Guia Astromágicko • {date.strftime('%d de %B de %Y')}"
        elements.append(Paragraph(subtitle, self.styles['AuroraCaption']))
        
        elements.append(Spacer(1, 20))
        
        # Linha decorativa
        elements.append(self._create_decorative_line())
        elements.append(Spacer(1, 15))
        
        return elements
    
    def _build_general_info(self, date: datetime.date) -> List[Any]:
        """Constrói seção de informações gerais"""
        elements = []
        
        elements.append(Paragraph("INFORMAÇÕES ASTROLÓGICAS", self.styles['AuroraHeading1']))
        
        # Calcular dados
        lunar_mansion = self.calculate_lunar_mansion(date)
        lunar_phase = self.calculate_lunar_phase(date)
        
        # Tabela de informações
        data = [
            ["Data:", date.strftime('%A, %d de %B de %Y')],
            ["Fase Lunar:", f"{lunar_phase} 🌙"],
            ["Mansão Lunar:", f"{lunar_mansion}ª Mansão"],
            ["Dia da Semana:", date.strftime('%A')],
            ["Estação:", self._get_season(date)]
        ]
        
        table = Table(data, colWidths=[4*cm, 10*cm])
        table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 11),
            ('TEXTCOLOR', (0, 0), (0, -1), self.COLORS['vinho']),
            ('TEXTCOLOR', (1, 0), (1, -1), self.COLORS['azul_noite']),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 0),
            ('RIGHTPADDING', (0, 0), (-1, -1), 0),
            ('TOPPADDING', (0, 0), (-1, -1), 3),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ]))
        
        elements.append(table)
        elements.append(Spacer(1, 20))
        
        return elements
    
    def _build_lunar_mansion_section(self, date: datetime.date) -> List[Any]:
        """Constrói seção da mansão lunar"""
        elements = []
        
        mansion_number = self.calculate_lunar_mansion(date)
        mansion_data = self.get_lunar_mansion_data(mansion_number)
        
        elements.append(Paragraph("MANSÃO LUNAR", self.styles['AuroraHeading1']))
        
        # Nome e espírito
        elements.append(Paragraph(f"<b>{mansion_data.get('nome', f'Mansão {mansion_number}')}</b>", self.styles['AuroraHeading2']))
        
        if 'espiritoToscano' in mansion_data:
            elements.append(Paragraph(f"Espírito Toscano: <i>{mansion_data['espiritoToscano']}</i>", self.styles['AuroraBody']))
        
        # Significado
        if 'significado' in mansion_data:
            elements.append(Paragraph(mansion_data['significado'], self.styles['AuroraBody']))
        
        # Usos mágicos
        if 'usosMagicos' in mansion_data:
            elements.append(Paragraph("<b>Usos Mágicos:</b>", self.styles['AuroraHeading2']))
            for uso in mansion_data['usosMagicos'][:5]:  # Limitar a 5 itens
                elements.append(Paragraph(f"• {uso}", self.styles['AuroraBody']))
        
        # Correspondências
        if 'correspondencias' in mansion_data:
            corr = mansion_data['correspondencias']
            elements.append(Paragraph("<b>Correspondências:</b>", self.styles['AuroraHeading2']))
            
            if 'ervas' in corr:
                ervas = ', '.join(corr['ervas'][:5])
                elements.append(Paragraph(f"<b>Ervas:</b> {ervas}", self.styles['AuroraBody']))
            
            if 'pedras' in corr:
                pedras = ', '.join(corr['pedras'][:5])
                elements.append(Paragraph(f"<b>Pedras:</b> {pedras}", self.styles['AuroraBody']))
            
            if 'cores' in corr:
                cores = ', '.join(corr['cores'][:3])
                elements.append(Paragraph(f"<b>Cores:</b> {cores}", self.styles['AuroraBody']))
        
        # Invocação
        if 'invocacao' in mansion_data:
            elements.append(Paragraph("<b>Invocação:</b>", self.styles['AuroraHeading2']))
            elements.append(Paragraph(f'"{mansion_data["invocacao"]}"', self.styles['AuroraQuote']))
        
        elements.append(Spacer(1, 20))
        
        return elements
    
    def _build_goddess_section(self, date: datetime.date) -> List[Any]:
        """Constrói seção da deusa do dia"""
        elements = []
        
        goddess = self.get_goddess_of_day(date)
        
        elements.append(Paragraph("DEUSA DO DIA", self.styles['AuroraHeading1']))
        
        elements.append(Paragraph(f"<b>{goddess['nome']}</b>", self.styles['AuroraHeading2']))
        elements.append(Paragraph(f"Elemento: {goddess['elemento']}", self.styles['AuroraBody']))
        elements.append(Paragraph(f"Domínio: {goddess['dominio']}", self.styles['AuroraBody']))
        
        if 'historia' in goddess:
            elements.append(Paragraph(goddess['historia'], self.styles['AuroraBody']))
        
        elements.append(Spacer(1, 20))
        
        return elements
    
    def _build_lunar_phase_section(self, date: datetime.date) -> List[Any]:
        """Constrói seção da fase lunar"""
        elements = []
        
        phase = self.calculate_lunar_phase(date)
        
        elements.append(Paragraph("FASE LUNAR", self.styles['AuroraHeading1']))
        elements.append(Paragraph(f"<b>Lua {phase}</b>", self.styles['AuroraHeading2']))
        
        # Descrições das fases
        phase_descriptions = {
            "Nova": "Tempo de novos começos, plantio de sementes de intenção, introspecção e planejamento.",
            "Crescente": "Período de crescimento, expansão, construção e manifestação de projetos.",
            "Cheia": "Momento de culminação, celebração, gratidão e liberação do que não serve.",
            "Minguante": "Fase de liberação, limpeza, reflexão e preparação para o novo ciclo."
        }
        
        elements.append(Paragraph(phase_descriptions.get(phase, "Influência lunar geral."), self.styles['AuroraBody']))
        
        elements.append(Spacer(1, 20))
        
        return elements
    
    def _build_magical_elections_section(self, date: datetime.date) -> List[Any]:
        """Constrói seção de eleições mágicas"""
        elements = []
        
        elements.append(Paragraph("ELEIÇÕES MÁGICAS", self.styles['AuroraHeading1']))
        
        # Simular scores baseados na data
        themes = {
            "Amor": self._calculate_theme_score(date, "amor"),
            "Trabalho": self._calculate_theme_score(date, "trabalho"),
            "Beleza": self._calculate_theme_score(date, "beleza"),
            "Prosperidade": self._calculate_theme_score(date, "prosperidade"),
            "Justiça": self._calculate_theme_score(date, "justica"),
            "Contato Espiritual": self._calculate_theme_score(date, "contato")
        }
        
        # Criar tabela de scores
        data = [["Tema", "Favorabilidade", "Score"]]
        for theme, score in themes.items():
            favorability = self._get_favorability_text(score)
            data.append([theme, favorability, f"{score}%"])
        
        table = Table(data, colWidths=[4*cm, 4*cm, 2*cm])
        table.setStyle(TableStyle([
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('TEXTCOLOR', (0, 0), (-1, 0), self.COLORS['dourado']),
            ('TEXTCOLOR', (0, 1), (-1, -1), self.COLORS['azul_noite']),
            ('ALIGN', (2, 0), (2, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('GRID', (0, 0), (-1, -1), 0.5, self.COLORS['salvia']),
            ('BACKGROUND', (0, 0), (-1, 0), self.COLORS['pergaminho']),
        ]))
        
        elements.append(table)
        elements.append(Spacer(1, 20))
        
        return elements
    
    def _build_correspondences_section(self, date: datetime.date) -> List[Any]:
        """Constrói seção de correspondências"""
        elements = []
        
        elements.append(Paragraph("CORRESPONDÊNCIAS DO DIA", self.styles['AuroraHeading1']))
        
        # Correspondências baseadas na fase lunar e mansão
        phase = self.calculate_lunar_phase(date)
        
        correspondences = {
            "Nova": {
                "cores": ["Preto", "Azul escuro", "Violeta"],
                "cristais": ["Obsidiana", "Ônix", "Hematita"],
                "ervas": ["Artemísia", "Sálvia", "Cedro"]
            },
            "Crescente": {
                "cores": ["Verde", "Dourado", "Amarelo"],
                "cristais": ["Quartzo verde", "Citrino", "Aventurina"],
                "ervas": ["Manjericão", "Hortelã", "Alecrim"]
            },
            "Cheia": {
                "cores": ["Branco", "Prateado", "Azul claro"],
                "cristais": ["Pedra da Lua", "Quartzo claro", "Selenita"],
                "ervas": ["Jasmim", "Rosa", "Lavanda"]
            },
            "Minguante": {
                "cores": ["Cinza", "Marrom", "Preto"],
                "cristais": ["Turmalina negra", "Smoky quartz", "Hematita"],
                "ervas": ["Arruda", "Guiné", "Alecrim"]
            }
        }
        
        phase_corr = correspondences.get(phase, correspondences["Nova"])
        
        elements.append(Paragraph(f"<b>Cores:</b> {', '.join(phase_corr['cores'])}", self.styles['AuroraBody']))
        elements.append(Paragraph(f"<b>Cristais:</b> {', '.join(phase_corr['cristais'])}", self.styles['AuroraBody']))
        elements.append(Paragraph(f"<b>Ervas:</b> {', '.join(phase_corr['ervas'])}", self.styles['AuroraBody']))
        
        elements.append(Spacer(1, 20))
        
        return elements
    
    def _build_footer(self) -> List[Any]:
        """Constrói rodapé do relatório"""
        elements = []
        
        elements.append(self._create_decorative_line())
        elements.append(Spacer(1, 10))
        
        footer_text = "Aurora Sagrada • Guia Astromágicko • Gerado automaticamente"
        elements.append(Paragraph(footer_text, self.styles['AuroraCaption']))
        
        return elements
    
    def _create_decorative_line(self) -> Any:
        """Cria linha decorativa"""
        from reportlab.platypus import HRFlowable
        return HRFlowable(width="100%", thickness=1, color=self.COLORS['dourado'])
    
    def _get_season(self, date: datetime.date) -> str:
        """Determina a estação do ano"""
        month = date.month
        day = date.day
        
        if (month == 12 and day >= 21) or month in [1, 2] or (month == 3 and day < 20):
            return "Verão" # Hemisfério Sul
        elif (month == 3 and day >= 20) or month in [4, 5] or (month == 6 and day < 21):
            return "Outono"
        elif (month == 6 and day >= 21) or month in [7, 8] or (month == 9 and day < 22):
            return "Inverno"
        else:
            return "Primavera"
    
    def _calculate_theme_score(self, date: datetime.date, theme: str) -> int:
        """Calcula score de favorabilidade para um tema"""
        # Algoritmo simplificado baseado na data e tema
        base_score = 50
        
        # Modificadores baseados no dia da semana
        weekday_modifiers = {
            "amor": [0, 10, -5, 5, 15, 20, 0],  # Domingo a Sábado
            "trabalho": [0, 15, 20, 15, 10, 5, -10],
            "beleza": [5, 10, 5, 10, 20, 15, 0],
            "prosperidade": [10, 5, 15, 20, 15, 10, 5],
            "justica": [15, 10, 20, 15, 10, 5, 0],
            "contato": [20, 5, 0, 10, 5, 0, 15]
        }
        
        weekday = date.weekday()  # 0 = Monday
        modifier = weekday_modifiers.get(theme, [0] * 7)[weekday]
        
        # Modificador baseado na fase lunar
        phase = self.calculate_lunar_phase(date)
        phase_modifiers = {
            "Nova": {"contato": 20, "trabalho": -10},
            "Crescente": {"prosperidade": 15, "trabalho": 10},
            "Cheia": {"amor": 20, "beleza": 15},
            "Minguante": {"justica": 15, "contato": 10}
        }
        
        phase_mod = phase_modifiers.get(phase, {}).get(theme, 0)
        
        final_score = base_score + modifier + phase_mod
        return max(0, min(100, final_score))
    
    def _get_favorability_text(self, score: int) -> str:
        """Converte score em texto de favorabilidade"""
        if score >= 80:
            return "Excelente"
        elif score >= 60:
            return "Favorável"
        elif score >= 40:
            return "Neutro"
        else:
            return "Desfavorável"

def main():
    """Função principal para teste"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Gerador de Relatórios Aurora Sagrada')
    parser.add_argument('--date', type=str, help='Data no formato YYYY-MM-DD')
    parser.add_argument('--output', type=str, help='Arquivo de saída PDF')
    parser.add_argument('--data-dir', type=str, help='Diretório das bases de dados')
    
    args = parser.parse_args()
    
    # Determinar data
    if args.date:
        try:
            date = datetime.datetime.strptime(args.date, '%Y-%m-%d').date()
        except ValueError:
            print("Formato de data inválido. Use YYYY-MM-DD")
            return
    else:
        date = datetime.date.today()
    
    # Criar gerador
    generator = AuroraReportGenerator(data_dir=args.data_dir)
    
    # Gerar relatório
    try:
        output_path = generator.generate_daily_report(date, args.output)
        print(f"Relatório gerado: {output_path}")
    except Exception as e:
        print(f"Erro ao gerar relatório: {e}")
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()

