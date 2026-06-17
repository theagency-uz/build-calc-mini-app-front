import { Calculator, Brush, Grid2X2, Layers, Package, Ruler, Send, SlidersHorizontal, Gauge, Beaker } from "lucide-react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import type { CalculationResult } from "@/entities/calculator/model";
import { calculationSections, coveringTypes, glueTrowels } from "@/entities/product/model";
import { useUnifiedCalculationForm } from "@/features/calculate-materials/model";
import { Button } from "@/shared/ui/button";
import { CommonInput, Select } from "@/shared/ui/forms";
import { translateOptions } from "@/shared/lib/i18n/options";

import { FormField } from "./form-field";

type UnifiedCalculationFormProps = {
	onCalculate: (result: CalculationResult) => void;
};

export function UnifiedCalculationForm({ onCalculate }: UnifiedCalculationFormProps) {
	const { t } = useTranslation();
	const {
		area,
		baseTypeOptions,
		control,
		floorMaterialOptions,
		glueMaterialOptions,
		isBaseTypeDisabled,
		isAllSection,
		isMaterialDisabled,
		isValid,
		materialOptions,
		onSubmit,
		showDilution,
		showLayerThickness,
		showTrowel,
		soilMaterialOptions,
		soilDilution,
	} = useUnifiedCalculationForm(onCalculate);
	const hasDynamicFields = showTrowel || showDilution || showLayerThickness;
	const translatedBaseTypeOptions = translateOptions(baseTypeOptions, t);
	const translatedMaterialOptions = translateOptions(materialOptions, t);
	const translatedSoilMaterialOptions = translateOptions(soilMaterialOptions, t);
	const translatedFloorMaterialOptions = translateOptions(floorMaterialOptions, t);
	const translatedGlueMaterialOptions = translateOptions(glueMaterialOptions, t);
	const translatedSoilDilution = soilDilution?.nameKey ? t(soilDilution.nameKey) : soilDilution?.name ?? "";

	return (
		<form onSubmit={onSubmit} className="space-y-6 rounded-[28px] border border-border bg-card p-6 shadow-popover">
			<div>
				<h2 className="mt-1 text-2xl font-bold text-card-foreground">{t("form.title")}</h2>
				<p className="mt-2 text-sm leading-5 text-muted-foreground">{t("form.description")}</p>
			</div>

			<Controller
				control={control}
				name="sectionId"
				render={({ field, fieldState }) => (
					<FormField label={t("form.fields.section")} icon={Calculator} error={fieldState.error?.message}>
						<Select
							name={field.name}
							value={field.value}
							options={translateOptions(calculationSections, t)}
							placeholder={t("form.placeholders.section")}
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
					{t("form.mainParams")}
				</p>

				<Controller
					control={control}
					name="area"
					render={({ field, fieldState }) => (
						<FormField label={t("form.fields.area")} icon={Ruler} error={fieldState.error?.message} valueText={area}>
							<CommonInput
								type="number"
								name={field.name}
								value={field.value}
								placeholder={t("form.placeholders.area")}
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
						<FormField label={t("form.fields.coveringType")} icon={Layers} error={fieldState.error?.message}>
							<Select
								name={field.name}
								value={field.value}
								options={translateOptions(coveringTypes, t)}
								placeholder={t("form.placeholders.coveringType")}
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
						<FormField label={t("form.fields.baseType")} icon={Grid2X2} error={fieldState.error?.message} disabled={isBaseTypeDisabled}>
							<Select
								name={field.name}
								value={field.value}
								options={translatedBaseTypeOptions}
								placeholder={isBaseTypeDisabled ? t("form.placeholders.baseTypeDisabled") : t("form.placeholders.baseType")}
								disabled={isBaseTypeDisabled}
								error={Boolean(fieldState.error)}
								onChange={field.onChange}
								onBlur={field.onBlur}
							/>
						</FormField>
					)}
				/>

				{isAllSection ? (
					<>
						<Controller
							control={control}
							name="soilMaterialId"
							render={({ field, fieldState }) => (
								<FormField label={t("form.fields.soilMaterial")} icon={Package} error={fieldState.error?.message}>
									<Select
										name={field.name}
										value={field.value}
										options={translatedSoilMaterialOptions}
										placeholder={isMaterialDisabled ? t("form.placeholders.materialDisabled") : t("form.placeholders.soilMaterial")}
										disabled={isMaterialDisabled}
										error={Boolean(fieldState.error)}
										onChange={field.onChange}
										onBlur={field.onBlur}
									/>
								</FormField>
							)}
						/>

						<Controller
							control={control}
							name="floorMaterialId"
							render={({ field, fieldState }) => (
								<FormField label={t("form.fields.floorMaterial")} icon={Package} error={fieldState.error?.message}>
									<Select
										name={field.name}
										value={field.value}
										options={translatedFloorMaterialOptions}
										placeholder={isMaterialDisabled ? t("form.placeholders.materialDisabled") : t("form.placeholders.floorMaterial")}
										disabled={isMaterialDisabled}
										error={Boolean(fieldState.error)}
										onChange={field.onChange}
										onBlur={field.onBlur}
									/>
								</FormField>
							)}
						/>

						<Controller
							control={control}
							name="glueMaterialId"
							render={({ field, fieldState }) => (
								<FormField label={t("form.fields.glueMaterial")} icon={Package} error={fieldState.error?.message}>
									<Select
										name={field.name}
										value={field.value}
										options={translatedGlueMaterialOptions}
										placeholder={isMaterialDisabled ? t("form.placeholders.materialDisabled") : t("form.placeholders.glueMaterial")}
										disabled={isMaterialDisabled}
										error={Boolean(fieldState.error)}
										onChange={field.onChange}
										onBlur={field.onBlur}
									/>
								</FormField>
							)}
						/>
					</>
				) : (
					<Controller
						control={control}
						name="materialId"
						render={({ field, fieldState }) => (
							<FormField label={t("form.fields.material")} icon={Package} error={fieldState.error?.message}>
								<Select
									name={field.name}
									value={field.value}
									options={translatedMaterialOptions}
									placeholder={isMaterialDisabled ? t("form.placeholders.materialDisabled") : t("form.placeholders.material")}
									disabled={isMaterialDisabled}
									error={Boolean(fieldState.error)}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							</FormField>
						)}
					/>
				)}
			</div>

			{hasDynamicFields ? (
				<div className="space-y-5 rounded-[20px] bg-background/45 p-4">
					<p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.08em] text-muted-foreground">
						<SlidersHorizontal className="size-4 text-primary" />
						{t("form.extraParams")}
					</p>

					{showTrowel ? (
						<Controller
							control={control}
							name="trowelId"
							render={({ field, fieldState }) => (
								<FormField label={t("form.fields.trowel")} icon={Brush} error={fieldState.error?.message}>
									<Select
										name={field.name}
										value={field.value}
										options={translateOptions(glueTrowels, t)}
										placeholder={t("form.placeholders.trowel")}
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
								<FormField label={t("form.fields.dilution")} icon={Beaker} error={fieldState.error?.message}>
									<CommonInput
										name={field.name}
										value={translatedSoilDilution}
										placeholder={t("form.placeholders.dilutionDisabled")}
										disabled
										error={Boolean(fieldState.error)}
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
								<FormField label={t("form.fields.layerThickness")} icon={Gauge} error={fieldState.error?.message}>
									<CommonInput
										type="number"
										name={field.name}
										value={field.value}
										placeholder={t("form.placeholders.layerThickness")}
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
				{t("form.actions.calculate")}
			</Button>
		</form>
	);
}
