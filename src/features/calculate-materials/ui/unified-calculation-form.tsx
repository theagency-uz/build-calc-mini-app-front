import { Calculator, Brush, Grid2X2, Layers, Package, Ruler, Send, SlidersHorizontal, Gauge, Beaker } from "lucide-react";
import { Controller } from "react-hook-form";

import type { CalculationResult } from "@/entities/calculator/model";
import { calculationSections, coveringTypes, glueTrowels, soilDilutions } from "@/entities/product/model";
import { useUnifiedCalculationForm } from "@/features/calculate-materials/model";
import { Button } from "@/shared/ui/button";
import { CommonInput, Select } from "@/shared/ui/forms";

import { FormField } from "./form-field";

type UnifiedCalculationFormProps = {
	onCalculate: (result: CalculationResult) => void;
};

export function UnifiedCalculationForm({ onCalculate }: UnifiedCalculationFormProps) {
	const {
		area,
		baseTypeOptions,
		control,
		isBaseTypeDisabled,
		isValid,
		materialOptions,
		onSubmit,
		showDilution,
		showLayerThickness,
		showTrowel,
	} = useUnifiedCalculationForm(onCalculate);
	const hasDynamicFields = showTrowel || showDilution || showLayerThickness;

	return (
		<form onSubmit={onSubmit} className="space-y-6 rounded-[28px] border border-border bg-card p-6 shadow-popover">
			<div>
				<h2 className="mt-1 text-2xl font-bold text-card-foreground">Параметры материала</h2>
				<p className="mt-2 text-sm leading-5 text-muted-foreground">
					Выберите раздел расчета, затем заполните общие и дополнительные поля.
				</p>
			</div>

			<Controller
				control={control}
				name="sectionId"
				render={({ field, fieldState }) => (
					<FormField label="Раздел расчета" icon={Calculator} error={fieldState.error?.message}>
						<Select
							name={field.name}
							value={field.value}
							options={calculationSections}
							placeholder="Выберите раздел"
							error={Boolean(fieldState.error)}
							onChange={field.onChange}
							onBlur={field.onBlur}
						/>
					</FormField>
				)}
			/>

			<div className="space-y-5 rounded-[20px] bg-background/45 p-4">
				<p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-muted-foreground">
					<SlidersHorizontal className="size-4 text-primary" />
					Основные параметры
				</p>

				<Controller
					control={control}
					name="area"
					render={({ field, fieldState }) => (
						<FormField label="Площадь (m2)" icon={Ruler} error={fieldState.error?.message} valueText={area}>
							<CommonInput
								type="number"
								name={field.name}
								value={field.value}
								placeholder="Например: 100"
								error={Boolean(fieldState.error)}
								onChange={field.onChange}
								onBlur={field.onBlur}
							/>
						</FormField>
					)}
				/>

				<Controller
					control={control}
					name="coveringTypeId"
					render={({ field, fieldState }) => (
						<FormField label="Тип покрытия" icon={Layers} error={fieldState.error?.message}>
							<Select
								name={field.name}
								value={field.value}
								options={coveringTypes}
								placeholder="Выберите тип покрытия"
								error={Boolean(fieldState.error)}
								onChange={field.onChange}
								onBlur={field.onBlur}
							/>
						</FormField>
					)}
				/>

				<Controller
					control={control}
					name="baseTypeId"
					render={({ field, fieldState }) => (
						<FormField label="Тип основания" icon={Grid2X2} error={fieldState.error?.message} disabled={isBaseTypeDisabled}>
							<Select
								name={field.name}
								value={field.value}
								options={baseTypeOptions}
								placeholder={isBaseTypeDisabled ? "Сначала выберите покрытие..." : "Выберите тип основания"}
								disabled={isBaseTypeDisabled}
								error={Boolean(fieldState.error)}
								onChange={field.onChange}
								onBlur={field.onBlur}
							/>
						</FormField>
					)}
				/>

				<Controller
					control={control}
					name="materialId"
					render={({ field, fieldState }) => (
						<FormField label="Название материала" icon={Package} error={fieldState.error?.message}>
							<Select
								name={field.name}
								value={field.value}
								options={materialOptions}
								placeholder="Выберите материал"
								error={Boolean(fieldState.error)}
								onChange={field.onChange}
								onBlur={field.onBlur}
							/>
						</FormField>
					)}
				/>
			</div>

			{hasDynamicFields ? (
				<div className="space-y-5 rounded-[20px] bg-background/45 p-4">
					<p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-muted-foreground">
						<SlidersHorizontal className="size-4 text-primary" />
						Дополнительные параметры
					</p>

					{showTrowel ? (
						<Controller
							control={control}
							name="trowelId"
							render={({ field, fieldState }) => (
								<FormField label="Шпатель" icon={Brush} error={fieldState.error?.message}>
									<Select
										name={field.name}
										value={field.value}
										options={glueTrowels}
										placeholder="Выберите шпатель"
										error={Boolean(fieldState.error)}
										onChange={field.onChange}
										onBlur={field.onBlur}
									/>
								</FormField>
							)}
						/>
					) : null}

					{showDilution ? (
						<Controller
							control={control}
							name="dilutionId"
							render={({ field, fieldState }) => (
								<FormField label="Разбавление" icon={Beaker} error={fieldState.error?.message}>
									<Select
										name={field.name}
										value={field.value}
										options={soilDilutions}
										placeholder="Выберите разбавление"
										error={Boolean(fieldState.error)}
										onChange={field.onChange}
										onBlur={field.onBlur}
									/>
								</FormField>
							)}
						/>
					) : null}

					{showLayerThickness ? (
						<Controller
							control={control}
							name="layerThickness"
							render={({ field, fieldState }) => (
								<FormField label="Толщина слоя (мм)" icon={Gauge} error={fieldState.error?.message}>
									<CommonInput
										type="number"
										name={field.name}
										value={field.value}
										placeholder="Например: 8"
										error={Boolean(fieldState.error)}
										onChange={field.onChange}
										onBlur={field.onBlur}
									/>
								</FormField>
							)}
						/>
					) : null}
				</div>
			) : null}

			<Button type="submit" icon={Send} disabled={!isValid}>
				Рассчитать расход
			</Button>
		</form>
	);
}
